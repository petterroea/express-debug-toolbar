/// <reference types="node" />
import Metadata from './metadata';
declare type MetadataList = {
    [key: string]: Metadata;
};
declare class Transaction {
    private request;
    private response;
    private uuid;
    private body;
    private statusCode;
    private headers;
    private start;
    private end;
    private metadataCollection;
    constructor(request: any, response: any);
    setBody(data: any): void;
    setStatus(status: number): void;
    setHeaders(headers: any): void;
    finalize(): void;
    getUUID(): string;
    attachMetadata(metadata: Metadata): void;
    serialize(): {
        request: {
            fresh: boolean;
            host: string;
            ip: string;
            ips: string[];
            method: string;
            originalUrl: string;
            params: import("express-serve-static-core").ParamsDictionary;
            query: any;
            headers: import("http").IncomingHttpHeaders;
        };
        response: {
            code: number;
            headers: any;
        };
        body: any;
        metadata: MetadataList;
        start: any;
        end: any;
    };
    serializeSummary(): {
        uuid: string;
        url: string;
        method: string;
        code: number;
        start: any;
        end: any;
    };
}
export default Transaction;
