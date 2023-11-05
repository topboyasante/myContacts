const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  deleteUser,
  updateUserProfile,
  updateUserPassword,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, getCurrentUser);

router.delete("/delete/:id", validateToken, deleteUser);

router.put("/:id", validateToken, updateUserProfile);

router.put("/password/:id", validateToken, updateUserPassword);

module.exports = router;
