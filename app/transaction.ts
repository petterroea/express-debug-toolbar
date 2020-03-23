import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import DebugState from './state';

import Metadata from './metadata';

import log from './logging';

type MetadataList = {
  [key: string]: Metadata;
};

class Transaction {
  private request: express.Request;
  private response: express.Response;
  private uuid: string;
  // Response info
  private body: any;
  private statusCode: number = 404; // If none of our hooks catch it, it was probably a 404.
  private headers: any;

  private start;
  private end;

  private metadataCollection: MetadataList = {};

  constructor(request, response) {
    this.request = request;
    this.response = response;

    this.uuid = uuidv4();
    this.start = new Date();

    log(`Created transaction ${this.uuid}`);
  }

  setBody(data: any) {
    this.body = data;
  }

  setStatus(status: number) {
    this.statusCode = status;
  }

  setHeaders(headers: any) {
    this.headers = headers;
  }

  finalize() {
    DebugState.finalizeTransaction(this);
    this.end = new Date();
  }

  getUUID(): string {
    return this.uuid;
  }

  attachMetadata(metadata: Metadata) {
    const metadataName = metadata.constructor.name;

    if (typeof this.metadataCollection[metadataName] !== 'undefined') {
      throw new Error('Failed to attach metadata: allready attached');
    }

    this.metadataCollection[metadataName] = metadata;
  }

  serialize() {
    return {
      request: {
        fresh: this.request.fresh,
        host: this.request.hostname,
        ip: this.request.ip,
        ips: this.request.ips,
        method: this.request.method,
        originalUrl: this.request.originalUrl,
        params: this.request.params,
        query: this.request.query,
        headers: this.request.headers,
      },
      response: {
        code: this.statusCode,
        headers: this.headers,
      },
      body: this.body,
      metadata: this.metadataCollection,
      start: this.start,
      end: this.end,
    };
  }

  serializeSummary() {
    return {
      uuid: this.uuid,
      url: this.request.originalUrl,
      method: this.request.method,
      code: this.statusCode,

      start: this.start,
      end: this.end,
    };
  }
}

export default Transaction;
