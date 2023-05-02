//import express
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
//import dotenv 
const dotenv = require("dotenv");
//load the env variables
dotenv.config();
//define the express function
const app = express();
//call the port from .env file
const port = process.env.PORT;
console.log(port)

//a middleware to parse the req body
app.use(express.json());
//call the routes using the below middleware
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//use the errorHandler to handle errors
app.use(errorHandler)

//call databse connection 
connectDB();


//make the port listen
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});