const express = require("express");
const router = express.Router();
const { create, update, destroy } = require("../controllers/reviews");
const verifyToken = require("../middlewares/verifyToken");
const can = require("../middlewares/permission");

router.post("/", verifyToken, can("admin", "student"), create);

router
  .route("/:id")
  .put(verifyToken, can("admin", "student"), update)
  .delete(verifyToken, can("admin", "student"), destroy);

module.exports = router;
