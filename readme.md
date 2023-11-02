# Contacts Management System - Node JS & Express

Building a Contact Management System with Node and Express. My Notes will be stored here.

### Setting Up:

- Initialize a new Node Project:

```node
    npm init
```

During initialization, set your entry point to `server.js` , a file which you create on your own.

- Install Nodemon as a dev dependency:

```node
    npm i nodemon -D
```

- In your `package.json` file, set your `npm start` and `npm run dev` commands to run `server.js`:

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
```

- Install Express & DotEnv (To help with the usage of environment variables) :

```node
    npm i express
    npm i dotenv
```

- Create your `server.js` file and set up a server:

```js
const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

//Middleware for API Routes
// "/api/contacts" is the route prefix all my endpoints will use.
// "./routes/contactRoutes" is the path to the folder that contains all my routes
app.use("/api/contacts", require("./routes/contactRoutes"));

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
```

- Set up your routes. Best practice is to have the routes in a route folder:

```js
const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Get All Contacts" });
});
router.route("/").post((req, res) => {
  res.status(200).json({ message: "Create Contact" });
});
router.route("/:id").put((req, res) => {
  res
    .status(200)
    .json({ message: `Update Contact with specified ID ${req.params.id}` });
});
router.route("/:id").delete((req, res) => {
  res
    .status(200)
    .json({ message: `Delete Contact with specified ID ${req.params.id}` });
});

module.exports = router;
```
- Have a `.gitignore` file that does not track your `node_modules` folder and your `.env` file.