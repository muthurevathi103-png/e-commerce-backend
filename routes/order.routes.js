const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

router.get("/", authMiddleware, getOrders);

router.post("/", authMiddleware, createOrder);

router.put("/:id", authMiddleware, updateOrder);

router.delete("/:id", authMiddleware, deleteOrder);

module.exports = router;