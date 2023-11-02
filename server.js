const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

//Function to connect to DB
connectDB()

const app = express();

const port = process.env.PORT || 5000;

//Middleware that provides a parser for the request body
app.use(express.json())

//Middleware for API Routes
app.use("/api/contacts",require("./routes/contactRoutes"))

//Middleware for Error Handling
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
