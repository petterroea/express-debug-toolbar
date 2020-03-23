import express from 'express';
import Transaction from './transaction';
declare class State {
    private transactions;
    private pendingTransactions;
    registerTransaction(req: express.Request, res: express.Response): Transaction;
    finalizeTransaction(transaction: Transaction): void;
    getRestApiRouter(): express.Router;
}
declare const DebugState: State;
export default DebugState;
