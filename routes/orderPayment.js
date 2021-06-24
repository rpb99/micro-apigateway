const express = require("express");
const router = express.Router();
const { getOrders } = require("../controllers/order-payment");
const verifyToken = require("../middlewares/verifyToken");
const can = require("../middlewares/permission");

router.get("/", verifyToken, can("admin", "student"), getOrders);

module.exports = router;
