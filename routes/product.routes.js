const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const controller = require("../controllers/product.controller");

console.log("authMiddleware:", typeof authMiddleware);
console.log("controller:", controller);
console.log("createProduct:", typeof controller.createProduct);

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = controller;

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, createProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;