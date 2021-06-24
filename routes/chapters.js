const express = require("express");
const router = express.Router();
const {
  getAll,
  get,
  create,
  update,
  destroy,
} = require("../controllers/chapters");
const verifyToken = require("../middlewares/verifyToken");
const can = require("../middlewares/permission");

router
  .route("/")
  .get(verifyToken, getAll)
  .post(verifyToken, can("admin"), create);

router
  .route("/:id")
  .get(verifyToken, can("admin"), get)
  .put(verifyToken, can("admin"), update)
  .delete(verifyToken, can("admin"), destroy);

module.exports = router;
