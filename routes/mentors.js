const express = require("express");
const router = express.Router();
const {
  getAll,
  get,
  create,
  update,
  destroy,
} = require("../controllers/mentors");
const verifyToken = require("../middlewares/verifyToken");
const can = require("../middlewares/permission");

router
  .route("/")
  .get(can("admin"), getAll)
  .post(verifyToken, can("admin"), create);

router
  .route("/:id")
  .get(can("admin"), get)
  .put(verifyToken, can("admin"), update)
  .delete(verifyToken, can("admin"), destroy);

module.exports = router;
