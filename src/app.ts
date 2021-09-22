import express from "express";
import mongoose from "mongoose";
import passport from "passport";
const accountRoutes = require('./routes/account')
const authRoutes = require("./routes/auth");
const cardRoutes = require('./routes/card')
const ruleRoutes = require('./routes/rule')
const userCardRoutes = require('./routes/userCard')
const userAccessRoutes = require('./routes/userAccess')
//const logger = require('./logger/logger')
const morgan = require("morgan");
require("dotenv").config();
const config = require("./config/db");
/* 
127.0.0.1:5120/api/auth/register
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
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json());
app.use(require("morgan")("dev"));
//app.use(require("morgan")("combined", { stream: logger.stream }))  //added here
app.use(express.json({ limit: '50mb' }))
app.use(require("cors")());

app.use("/api/auth", authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/rule', ruleRoutes);
app.use('/api/users_card', userCardRoutes);
app.use('/api/card', cardRoutes);
app.use('user_access', userAccessRoutes);

module.exports = app;
