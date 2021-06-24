const express = require("express");
const router = express.Router();
const { create, destroy } = require("../controllers/image-courses");
const verifyToken = require("../middlewares/verifyToken");
const can = require("../middlewares/permission");

router.post("/", verifyToken, can("admin"), create);

router.delete("/:id", verifyToken, can("admin"), destroy);

module.exports = router;
