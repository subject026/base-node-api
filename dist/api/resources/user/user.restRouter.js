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
const express_1 = __importDefault(require("express"));
const user_model_1 = require("./user.model");
const user_controller_1 = require("./user.controller");
const protect = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ message: "Log in first!" });
    }
    next();
});
const protectAdmin = (req, res, next) => {
    if (!req.user.isAdmin)
        return res.status(401).json({ message: "Not Authorized!" });
    return next();
};
const signupValidator = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { email, password, confirmPassword } = req.body;
    let user;
    try {
        user = yield user_model_1.User.findOne({ email });
        if (user)
            return res.status(400).json({ message: "Email already registered" });
    }
    catch (err) {
        console.log(err);
    }
    if (password !== confirmPassword)
        return res.status(400).json({ message: "Passwords didn't match" });
    next();
});
const router = express_1.default.Router();
router.route("/").post(signupValidator, user_controller_1.createOne);
router.route("/").get(protectAdmin, user_controller_1.getAll);
exports.default = router;
