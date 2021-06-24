const express = require("express");
const router = express.Router();
const {
  getAll,
  get,
  create,
  update,
  destroy,
} = require("../controllers/lessons");
const verifyToken = require("../middlewares/verifyToken");

router.route("/").get(verifyToken, getAll).post(verifyToken, create);

router
  .route("/:id")
  .get(verifyToken, get)
  .put(verifyToken, update)
  .delete(verifyToken, destroy);

module.exports = router;
