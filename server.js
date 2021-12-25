require("dotenv").config();
const express = require("express");
const app = express();
const dbConfig = require("./config/dbConfig");

(async function () {
  const db = await dbConfig.dbPool;
  app.locals.db = db;
  app.listen(process.env.PORT, process.env.HOST, function () {
    console.log(
      "Node app is listening at http://%s:%s",
      process.env.HOST,
      process.env.PORT
    );
  });
  var pg = require("pg"),
    pgConnectionString = "postgres://postgres:root@localhost/instagram";

  var client = new pg.Client(pgConnectionString);
  client.connect();
  client.query('LISTEN "follower_notification"');
  client.on("notification", function (data) {
    console.log("notification ===> ",data)
    console.log("payload ===> ",data.payload)
  });
})();
