const express = require("express");

const app = express();
require("dotenv").config();
//====================================================================================================
// express app
const PORT = process.env.PORT || 6000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
//====================================================================================================
//to wrtie at terminal what methoud used
const morgan = require("morgan");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}
//====================================================================================================
//to call DB
const dbConnection = require("./config/DB");

dbConnection();
//====================================================================================================
// Middlewares
app.use(express.json({ limit: "20kb" })); //use to convert string from database to json file
//====================================================================================================
//call routes
const categoryRoute = require("./routes/categoryRoute");
const { rawListeners } = require("./models/catigoryModel");

app.use("/api/v1/catigories", categoryRoute);
//====================================================================================================
//search at all rout previos it not exist send this message
//create error and send to handel middilware to show
const ApiError = require("./utils/apiError");

app.all("*", (req, res, next) => {
  /* const err = new Error(`Can't find this route: ${req.originalUrl}`);
  next(err.message); */
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});
//====================================================================================================
//Global error handling middelware in express to handel the error to make it error easy to read
const globalError = require("./middlewares/errorMiddleware");

app.use(globalError);

/* app.use((err , req , res , next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
  //res.status(500).json({err})
}) */
//====================================================================================================
// Handle rejection outside express if you forge .catch in any promises function
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
//====================================================================================================
//====================================================================================================
//====================================================================================================
//====================================================================================================
//====================================================================================================
