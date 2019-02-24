"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_2.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    username: {
        type: String,
        required: false
    },
    name: {
        title: {
            type: String,
            required: false
        },
        first: {
            type: String,
            required: false
        },
        last: {
            type: String,
            required: false
        }
    },
    telephone: {
        type: String,
        required: false
    },
    profileImageUrl: {
        type: String,
        required: false
    }
}, { timestamps: true });
userSchema.pre("save", function (next) {
    if (!this.isModified("password"))
        return next();
    bcrypt_1.default.hash(this.password, 8, (err, hash) => {
        if (err)
            return next(err);
        this.password = hash;
        /*
          Note: this next() isn't an express NextFunction, it's
          mongoose's own next function for stepping through middleware
        */
        next();
    });
});
userSchema.methods.checkPassword = function (password) {
    const passwordHash = this.password;
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(password, passwordHash, (err, same) => {
            if (err) {
                return reject(err);
            }
            resolve(same);
        });
    });
};
/* eslint-enable */
exports.User = mongoose_1.default.model("user", userSchema);
