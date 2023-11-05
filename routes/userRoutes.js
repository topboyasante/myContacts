const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  deleteUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, getCurrentUser);

router.delete("/delete/:id", validateToken, deleteUser);

module.exports = router;
