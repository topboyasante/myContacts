const express = require("express");
const {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContacts,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken) //validate all routes

router.route("/").get(getContacts);
//you can do come chaining (like this->) if two methods have the same route path : router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact);

router.route("/").post(createContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;
