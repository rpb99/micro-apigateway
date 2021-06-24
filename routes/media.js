const express = require("express");
const router = express.Router();
const { create, getAll, destroy } = require("../controllers/media");
const verifyToken = require("../middlewares/verifyToken");
const can = require("../middlewares/permission");

router
  .route("/")
  .post(verifyToken, can("admin", "student"), create)
  .get(verifyToken, can("admin", "student"), getAll);
router.route("/:id").delete(verifyToken, can("admin", "student"), destroy);

module.exports = router;
