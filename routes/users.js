const express = require("express");
const router = express.Router();
const {
  register,
  login,
  update,
  getUser,
  logout,
} = require("../controllers/users");
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", register);
router.post("/login", login);
router.put("/", verifyToken, update);
router.get("/", verifyToken, getUser);
router.post("/logout", verifyToken, logout);

module.exports = router;
