const express = require("express");
const router = express.Router();
const { create, get } = require("../controllers/my-courses");
const verifyToken = require("../middlewares/verifyToken");
const can = require("../middlewares/permission");

router.post("/", verifyToken, can("admin", "student"), create);

router.get("/", verifyToken, can("admin", "student"), get);

module.exports = router;
