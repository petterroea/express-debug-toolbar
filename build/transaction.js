"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const state_1 = __importDefault(require("./state"));
const logging_1 = __importDefault(require("./logging"));
class Transaction {
    constructor(request, response) {
        this.statusCode = 404; //If none of our hooks catch it, it was probably a 404.
        this.metadataCollection = {};
        this.request = request;
        this.response = response;
        this.uuid = uuid_1.v4();
        this.start = new Date();
        logging_1.default(`Created transaction ${this.uuid}`);
    }
    setBody(data) {
        this.body = data;
    }
    setStatus(status) {
        this.statusCode = status;
    }
    setHeaders(headers) {
        this.headers = headers;
    }
    finalize() {
        state_1.default.finalizeTransaction(this);
        this.end = new Date();
    }
    getUUID() {
        return this.uuid;
    }
    attachMetadata(metadata) {
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
                headers: this.request.headers
            },
            response: {
                code: this.statusCode,
                headers: this.headers
            },
            body: this.body,
            metadata: this.metadataCollection,
            start: this.start,
            end: this.end
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
exports.default = Transaction;
