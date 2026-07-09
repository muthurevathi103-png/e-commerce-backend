const Cart = require("../models/cart.model");

// Get User Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find()
      .populate("product")
      .populate("user");

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Product to Cart
const addToCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;

    const cart = await Cart.create({
      user,
      product,
      quantity,
    });

    res.status(201).json({
      message: "Product Added to Cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Cart
const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({
        message: "Cart Not Found",
      });
    }

    res.status(200).json({
      message: "Cart Updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Cart
const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);

    if (!cart) {
      return res.status(404).json({
        message: "Cart Not Found",
      });
    }

    res.status(200).json({
      message: "Cart Deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  deleteCart,
};