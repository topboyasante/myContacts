const express = require("express");
const { registerUser, loginUser, getCurrentUser } = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", getCurrentUser);

module.exports = router;
