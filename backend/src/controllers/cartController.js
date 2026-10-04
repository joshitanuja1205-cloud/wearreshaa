const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ================= GET CART =================

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Get cart error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
    });
  }
};

// ================= ADD TO CART =================

const addToCart = async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;

    // Check required fields
    if (!productId || !quantity || !size || !color) {
      return res.status(400).json({
        success: false,
        message: "Product, quantity, size and color are required",
      });
    }

    // Find product
    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find user's cart
    let cart = await Cart.findOne({
      user: req.user._id,
    });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    // Check if same product + size + color already exists
    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.size === size &&
        item.color.name === color.name
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({
        product: productId,
        quantity: Number(quantity),
        size,
        color: {
          name: color.name,
          hex: color.hex,
        },
      });
    }

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to add product to cart",
    });
  }
};

// ================= UPDATE CART ITEM =================

const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    // Validate quantity
    if (!quantity || Number(quantity) < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    // Find user's cart
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find cart item
    const item = cart.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Update quantity
    item.quantity = Number(quantity);

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.error("Update cart error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update cart",
    });
  }
};

// ================= REMOVE CART ITEM =================

const removeCartItem = async (req, res) => {
  try {
    // Find user's cart
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find cart item
    const item = cart.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Remove item
    item.deleteOne();

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    console.error("Remove cart item error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to remove cart item",
    });
  }
};

// ================= CLEAR CART =================

const clearCart = async (req, res) => {
  try {
    // Find user's cart
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Remove all items
    cart.items = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    console.error("Clear cart error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to clear cart",
    });
  }
};

// ================= EXPORTS =================

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};