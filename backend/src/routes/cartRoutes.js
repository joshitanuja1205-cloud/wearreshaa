const express = require("express");

const {
  getCart,
  syncCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// GET CART
router.get("/", protect, getCart);
console.log("🔥 SYNC ROUTE REGISTERED");
router.put("/sync", protect, syncCart);

// ADD TO CART
router.post("/", protect, addToCart);

// UPDATE CART ITEM
console.log("🔥 ITEM UPDATE ROUTE REGISTERED");
router.put("/:itemId", protect, updateCartItem);

// REMOVE CART ITEM
router.delete("/:itemId", protect, removeCartItem);

// CLEAR CART
console.log("🔥 CLEAR CART ROUTE REGISTERED");
router.delete("/", protect, clearCart);

module.exports = router;