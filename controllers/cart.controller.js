const Cart = require("../models/cart.model");

// Get User Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user.id,
    })
      .populate("product")
      .populate("user");

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Product to Cart
const addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    const existingCart = await Cart.findOne({
      user: req.user.id,
      product,
    });

    if (existingCart) {
      existingCart.quantity += quantity || 1;
      await existingCart.save();

      return res.status(200).json({
        message: "Cart Updated Successfully",
        cart: existingCart,
      });
    }

    const cart = await Cart.create({
      user: req.user.id,
      product,
      quantity: quantity || 1,
    });

    const populatedCart = await Cart.findById(cart._id)
      .populate("product")
      .populate("user", "name email");

    res.status(201).json({
      message: "Product Added Successfully",
      cart: populatedCart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Cart
const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        quantity,
      },
      {
        new: true,
      }
    ).populate("product");

    if (!cart) {
      return res.status(404).json({
        message: "Cart Not Found",
      });
    }

    res.status(200).json({
      message: "Cart Updated Successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Cart
const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart Not Found",
      });
    }

    res.status(200).json({
      message: "Cart Item Removed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  deleteCart,
};