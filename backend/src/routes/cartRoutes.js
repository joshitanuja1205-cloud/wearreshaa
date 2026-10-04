const express = require("express");

const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// GET CART
router.get("/", protect, getCart);

// ADD TO CART
router.post("/", protect, addToCart);

// UPDATE CART ITEM

router.put("/:itemId", protect, updateCartItem);

// REMOVE CART ITEM
router.delete("/:itemId", protect, removeCartItem);

// CLEAR CART

router.delete("/", protect, clearCart);

module.exports = router;