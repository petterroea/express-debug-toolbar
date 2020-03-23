"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
class ExceptionMetadata extends _1.default {
    constructor(exception) {
        super();
        this.exception = exception;
    }
}
exports.default = ExceptionMetadata;
