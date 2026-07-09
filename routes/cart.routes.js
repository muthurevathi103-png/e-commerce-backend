const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getCart,
  addToCart,
  updateCart,
  deleteCart,
} = require("../controllers/cart.controller");

router.get("/", authMiddleware, getCart);

router.post("/", authMiddleware, addToCart);

router.put("/:id", authMiddleware, updateCart);

router.delete("/:id", authMiddleware, deleteCart);

module.exports = router;