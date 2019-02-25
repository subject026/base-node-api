const request = require("request-promise");
const mongoose = require("mongoose");

import config from "./config";
import { User } from "./api/resources/user/user.model";

(async function() {
  mongoose.Promise = global.Promise;
  try {
    await mongoose.connect(config.db, { useNewUrlParser: true });
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }

  if (process.argv.length > 2 && process.argv[2].toUpperCase() === "CLEAR") {
    console.log("Clearing DB....");
    await User.deleteMany({});
    console.log("Done!");
    process.exit(0);
  } else {
    const url = `https://randomuser.me/api/?results=${process.argv[2] || 20}`;
    const res = await request(url, {
      resolveWithFullResponse: true
    });
    const results = JSON.parse(res.body).results;
    results.forEach(async result => {
      const {
        email,
        login: { password, username },
        name,
        phone,
        picture: { large }
      } = result;
      await User.create({
        email,
        password,
        name,
        username,
        telephone: phone,
        profileImageUrl: large
      });
    });
    await User.create({
      email: "admin@example.com",
      password: "password",
      isAdmin: true
    });
    console.log("All done :->)");
    process.exit(0);
  }
})();
