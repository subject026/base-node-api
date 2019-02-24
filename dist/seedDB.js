"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
const mongoose = require("mongoose");
const config_1 = __importDefault(require("./config"));
const user_model_1 = require("./api/resources/user/user.model");
const url = "https://randomuser.me/api/?results=10";
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose.Promise = global.Promise;
        try {
            yield mongoose.connect(config_1.default.db, { useNewUrlParser: true });
            console.log("connected to mongodb");
        }
        catch (err) {
            console.log(err);
        }
        if (process.argv[2].toUpperCase() === "CLEAR") {
            console.log("Clearing DB....");
            yield user_model_1.User.deleteMany({});
            console.log("Done!");
            process.exit(0);
        }
        else {
            const res = yield request(url, {
                resolveWithFullResponse: true
            });
            const results = JSON.parse(res.body).results;
            console.log(results);
            results.forEach((result) => __awaiter(this, void 0, void 0, function* () {
                const { email, login: { password } } = result;
                const doc = yield user_model_1.User.create({ email, password });
            }));
        }
    });
})();
