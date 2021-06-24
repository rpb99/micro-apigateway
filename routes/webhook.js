const express = require("express");
const router = express.Router();
const { webhook } = require("../controllers/webhook");

router.post("/", webhook);

module.exports = router;
