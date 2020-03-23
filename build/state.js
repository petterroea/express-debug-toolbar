"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_1 = __importDefault(require("./transaction"));
class State {
    constructor() {
        this.transactions = {};
        this.pendingTransactions = {};
    }
    registerTransaction(req, res) {
        const transaction = new transaction_1.default(req, res);
        this.pendingTransactions[transaction.getUUID()] = transaction;
        return transaction;
    }
    finalizeTransaction(transaction) {
        if (typeof this.pendingTransactions[transaction.getUUID()] !== 'undefined') {
            if (typeof this.transactions[transaction.getUUID()] === 'undefined') {
                this.transactions[transaction.getUUID()] = transaction;
                delete this.pendingTransactions[transaction.getUUID()];
            }
            else {
                throw new Error('Internal state error: tried to finalize transaction that is already finalized');
            }
        }
        else {
            throw new Error('Internal state error: tried to finalize transaction that is already finalized');
        }
    }
    getRestApiRouter() {
        const route = express_1.default.Router();
        route.get('/:uuid', (req, res) => {
            const uuid = req.params.uuid;
            if (typeof this.transactions[uuid] !== 'undefined') {
                res.json(this.transactions[uuid].serialize());
            }
            else {
                res.status(404).send('Not found');
            }
        });
        route.get('/', (req, res) => {
            const summary = [];
            for (const obj in this.transactions) {
                summary.push(this.transactions[obj].serializeSummary());
            }
            res.json(summary.reverse());
        });
        return route;
    }
}
const DebugState = new State();
exports.default = DebugState;
