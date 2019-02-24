"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const generateControllers_1 = __importDefault(require("../../util/generateControllers"));
const user_model_1 = require("./user.model");
_a = generateControllers_1.default(user_model_1.User), exports.createOne = _a.createOne, exports.getAll = _a.getAll;
