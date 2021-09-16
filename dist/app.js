"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const authRoutes = require("./routes/auth");
//const logger = require('./logger/logger')
const morgan = require("morgan");
require("dotenv").config();
const keys = require("./config/keys");
const config = require("./config/db");
let app = express_1.default();
mongoose_1.default.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    // we're connected!
    console.log("MongoDb connect");
});
//logger.info('Hello again distributed logs');
app.use("/uploads", express_1.default.static("uploads"));
app.use(passport_1.default.initialize());
require("./middleware/passport")(passport_1.default);
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(require("morgan")("dev"));
//app.use(require("morgan")("combined", { stream: logger.stream }))  //added here
app.use(require("cors")());
app.use("/api/auth", authRoutes);
module.exports = app;
//# sourceMappingURL=app.js.map