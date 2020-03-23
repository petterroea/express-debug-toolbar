"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _1 = __importDefault(require("./"));
const logging_1 = __importDefault(require("./logging"));
const app = express_1.default();
_1.default.attach(app);
app.all('/', (req, res) => {
    res.send('Yep, it still works!');
});
app.get('/status/:code', (req, res) => {
    const c = parseInt(req.params.code);
    res.status(c).send(`This should be a ${c} error`);
});
app.listen(8000, () => {
    logging_1.default(`Test server has started`);
});
