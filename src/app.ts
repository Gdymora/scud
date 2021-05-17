import express from 'express'
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const logger = require('./logger/logger')
const morgan = require('morgan')
require("dotenv").config()
declare let process: {
  env: {
    PORT: number;
    HOST: string;
  };
};

//logger.info('Hello again distributed logs');

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(require('morgan')('dev'))
app.use(require("morgan")("combined", { stream: logger.stream }));  //added here
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)


module.exports = app