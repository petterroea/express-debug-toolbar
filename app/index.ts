import express from 'express';

import DebugState from './state';

import ExceptionMetadata from './metadata/exception';

import DebugRequest from './debugRequest';

import log from './logging';

class RequestCatcher {
  //private app: express.Application;
  attach(app) {
    log('Attached to express instance');
    //this.app = app;
    // Attach the router first, so we don't deal with calls to ourselves
    app.use('/_debug/', this.getRouter());
    // Use `bind` to preserve `this`
    app.use(this.middleware.bind(this));
  }

  private middleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    log('Catched a request');
    const transaction = DebugState.registerTransaction(req, res);

    // Hacky hack to inject extra fields in the request
    const metadataInjector: any = req as any;
    metadataInjector.debugMetadata = {};
    metadataInjector.transaction = transaction;

    // Hook the send() call
    const oldSend = res.send;
    res.send = (message: any): express.Response<any> => {
      log(`send was called`)
      transaction.setStatus(res.statusCode);
      transaction.setResponse(message);
      transaction.setHeaders(res.getHeaders());
      transaction.setDidComplete(true);
      log(`Send hooking complete`)
      return oldSend.apply(res, [message]);
    };

    const oldJson = res.json;
    res.json = (message: any): express.Response<any> => {
      log(`json was called`)
      transaction.setStatus(res.statusCode);
      transaction.setResponse(message);
      transaction.setHeaders(res.getHeaders());
      transaction.setDidComplete(true);
      log(`JSON hooking complete`)
      return oldJson.apply(res, [message]);
    };

    try {
      next();
    } catch (e) {
      log(`Request failed: ${e}`);
      transaction.attachMetadata(new ExceptionMetadata(e));
    }

    transaction.finalize();
    log('Request is handled');
  }

  private getRouter(): express.Router {
    const route = express.Router();

    route.use(express.static(__dirname + '/frontend'));
    route.use('/api', DebugState.getRestApiRouter());

    route.use((req, res, next) => {
      res.sendFile(__dirname + '/frontend/index.html');
    });

    return route;
  }
}

const DebugToolbar = new RequestCatcher();

export default DebugToolbar;
