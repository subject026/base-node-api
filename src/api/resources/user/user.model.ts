import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUserModel extends Document {
  email: string;
  password: string;
  isAdmin: boolean;
  checkPassword(password: string): boolean;
}

const userSchema: Schema = new Schema(
  {
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
    }
  },
  { timestamps: true }
);

userSchema.pre<IUserModel>("save", function(next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    /*
      Note: this next() isn't an express NextFunction, it's
      mongoose's own next function for stepping through middleware
    */
    next();
  });
});

userSchema.methods.checkPassword = function(password: string) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
};
/* eslint-enable */

export const User = mongoose.model<IUserModel>("user", userSchema);
