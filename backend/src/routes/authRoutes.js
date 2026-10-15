const express = require("express");

const {
  getMe,
  googleLogin,
  googleCallback,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// CURRENT USER
// =====================================================

router.get(
  "/me",
  protect,
  getMe
);

// =====================================================
// GOOGLE LOGIN
// =====================================================

router.get(
  "/google",
  googleLogin
);

// =====================================================
// GOOGLE CALLBACK
// =====================================================

router.get(
  "/google/callback",
  googleCallback
);

module.exports = router;