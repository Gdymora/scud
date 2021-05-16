import express from 'express'
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
import morgan = require('morgan');
//http://localhost:5000/api/auth/login
require("dotenv").config()
declare let process: {
  env: {
    PORT: number; 
    HOST: string;
  };
};

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(require('morgan')('dev'))
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)


module.exports = app