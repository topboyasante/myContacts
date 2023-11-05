const express = require("express");
const {
  getContactByName,
  createContact,
  updateContact,
  deleteContact,
  getContacts,
  getContactById,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken) //validate all routes

router.route("/").get(getContacts);
//you can do come chaining (like this->) if two methods have the same route path : router.route("/").get(getContacts).post(createContact);

router.route("/:name").post(getContactByName);

router.route("/:id").post(getContactById);

router.route("/").post(createContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;
