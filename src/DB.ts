import mongoose from "mongoose";
import config from "./config";

(<any>mongoose).Promise = global.Promise;

export default (): void => {
  mongoose.connect(config.db, { useNewUrlParser: true });
};
