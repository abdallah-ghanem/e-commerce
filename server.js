const express = require("express");
const app = express();
require('dotenv').config()
//====================================================================================================
// express app
const PORT = process.env.PORT || 6000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
//====================================================================================================
//to wrtie at terminal what methoud used
const morgan = require('morgan');
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}
//====================================================================================================
//to call DB
const dbConnection = require('./config/DB');
dbConnection();
//====================================================================================================
// Middlewares
app.use(express.json({ limit: '20kb' }));//use to convert string from database to json file
//====================================================================================================
//call routes
const categoryRoute = require('./routes/categoryRoute');
app.use('/api/v1/catigories', categoryRoute);
//====================================================================================================
//====================================================================================================
//====================================================================================================
//====================================================================================================
//====================================================================================================
//====================================================================================================
//====================================================================================================
//====================================================================================================

