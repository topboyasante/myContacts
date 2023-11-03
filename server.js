const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
var cors = require("cors");

//Function to connect to DB
connectDB();

const app = express();

const port = process.env.PORT || 5000;

//Enable CORS
app.use(cors());

//Middleware that provides a parser for the request body
app.use(express.json());

//Middleware for API Routes
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//Middleware for Error Handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
