"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DB_1 = __importDefault(require("./DB"));
const config_1 = __importDefault(require("./config"));
const setupMiddleware_1 = __importDefault(require("./setupMiddleware"));
const restRouter_1 = __importDefault(require("./api/restRouter"));
console.log(config_1.default);
const app = express_1.default();
DB_1.default();
setupMiddleware_1.default(app);
app.use('/api', restRouter_1.default);
const port = config_1.default.port || 8080;
app.listen(port, () => console.log(`App running on port ${port} 🍉 🍓`));
