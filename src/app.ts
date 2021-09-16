import express from "express";
import mongoose from "mongoose";
import passport from "passport";
const authRoutes = require("./routes/auth");
//const logger = require('./logger/logger')
const morgan = require("morgan");
require("dotenv").config();

const keys = require("./config/keys");
const config = require("./config/db");

/* 
127.0.0.1:5120/api/auth/register
127.0.0.1:5120/api/auth/login 
{
    "email": "resintegra@mail.ru",
    "password": "123456"
}
*/

declare let process: {
  env: {
    PORT: number;
    HOST: string;
  };
};
let app = express();

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("MongoDb connect");
});
//logger.info('Hello again distributed logs');
app.use("/uploads", express.static("uploads"));
app.use(passport.initialize());
require("./middleware/passport")(passport);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("morgan")("dev"));
//app.use(require("morgan")("combined", { stream: logger.stream }))  //added here
app.use(require("cors")());

app.use("/api/auth", authRoutes);

module.exports = app;
