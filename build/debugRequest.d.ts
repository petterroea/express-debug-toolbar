import express from 'express';
import Metadata from './metadata';
import Transaction from './transaction';
declare type ExtraDebugFields = {
    debugMetadata: {
        [key: string]: Metadata;
    };
    transaction: Transaction;
};
declare type DebugRequest = express.Response | ExtraDebugFields;
export default DebugRequest;
