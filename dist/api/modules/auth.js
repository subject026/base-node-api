"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const user_model_1 = require("../resources/user/user.model");
const checkCookie = (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.user) {
        try {
            const user = (yield user_model_1.User.findById(req.user._id));
            if (!user) {
                // Cookie had a verified token but no user found for _id
                // Clear cookie
                res.clearCookie("token");
                res.status(404).json({
                    message: "User not found",
                    user: {
                        isLoggedIn: false
                    }
                });
            }
            res.status(200).json({
                user: {
                    isLoggedIn: true,
                    email: user.email,
                    isAdmin: user.isAdmin
                }
            });
        }
        catch (err) {
            console.log("\n\nERRRR\n\n", err.message);
            res.status(400).json({ message: "Could not check current user!" });
        }
    }
    else {
        res.send({ user: { isLoggedIn: false } });
    }
});
exports.checkCookie = checkCookie;
const login = (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Check if already logged in
    if (req.user) {
        // 409:  conflict
        return res.status(409).json({ message: "Already logged in!" });
    }
    console.log("no existing token... logging in!");
    // Look up user
    let user;
    try {
        user = (yield user_model_1.User.findOne({ email: req.body.email })
            .select("email password isAdmin")
            .exec());
    }
    catch (err) {
        console.log(err);
    }
    console.log(user);
    const match = yield user.checkPassword(req.body.password);
    console.log("match? ", match);
    // no match : Send response advising login failed
    if (!match)
        return res.status(401).send({ message: "login failed!" });
    // match : Sign jwt and add to cookie
    console.log("No token, need to set one...");
    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.APP_SECRET);
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
    });
    return res
        .status(200)
        .json({ user: { email: user.email, isAdmin: user.isAdmin } });
});
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("token");
    return res.json({ user: false });
};
exports.logout = logout;
