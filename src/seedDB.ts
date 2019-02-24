const request = require("request-promise");
const mongoose = require("mongoose");

import config from "./config";
import { User } from "./api/resources/user/user.model";

const url = "https://randomuser.me/api/?results=10";

(async function() {
  mongoose.Promise = global.Promise;
  try {
    await mongoose.connect(config.db, { useNewUrlParser: true });
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }

  if (process.argv[2].toUpperCase() === "CLEAR") {
    console.log("Clearing DB....");
    await User.deleteMany({});
    console.log("Done!");
    process.exit(0);
  } else {
    const res = await request(url, {
      resolveWithFullResponse: true
    });
    const results = JSON.parse(res.body).results;
    console.log(results);
    results.forEach(async result => {
      const {
        email,
        login: { password }
      } = result;
      const doc = await User.create({ email, password });
    });
  }
})();
