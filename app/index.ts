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
    res.send = (...args: any[]): express.Response<any> => {
      transaction.setStatus(res.statusCode);

      //Compatability with the pre express 4 way of doing it
      if (args.length == 2) {
        if(typeof args[0] === "number") {
          transaction.setResponse(args[1]);
        } else {
          transaction.setResponse(args[0]);
        }
      } else {
        transaction.setResponse(args[0]);
      }

      transaction.setHeaders(res.getHeaders());
      transaction.setDidComplete(true);
      return oldSend.apply(res, args);
    };

    const oldJson = res.json;
    res.json = (...args): express.Response<any> => {
      transaction.setStatus(res.statusCode);
      transaction.setResponse(args[0]);
      transaction.setHeaders(res.getHeaders());
      transaction.setDidComplete(true);
      return oldJson.apply(res, args);
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
