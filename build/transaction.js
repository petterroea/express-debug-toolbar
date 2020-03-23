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
        this.statusCode = 0; // If none of our hooks catch it, it was probably a 404.
        this.didComplete = false;
        this.metadataCollection = {};
        this.request = request;
        this.response = response;
        let postData = "";
        request.on('data', (chunk) => {
            postData += chunk;
        });
        request.on('end', () => {
            if (postData.length != 0) {
                this.postBody = postData;
            }
        });
        this.uuid = uuid_1.v4();
        this.start = new Date();
        logging_1.default(`Created transaction ${this.uuid}`);
    }
    setResponse(data) {
        this.responseBody = data;
    }
    setStatus(status) {
        this.statusCode = status;
    }
    setHeaders(headers) {
        this.headers = headers;
    }
    setDidComplete(flag) {
        this.didComplete = flag;
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
            didComplete: this.didComplete,
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
                body: this.postBody
            },
            response: {
                code: this.statusCode,
                headers: typeof this.headers === "undefined" ? {} : this.headers,
                body: this.responseBody
            },
            metadata: this.metadataCollection,
            start: this.start,
            end: this.end,
        };
    }
    serializeSummary() {
        return {
            didComplete: this.didComplete,
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
