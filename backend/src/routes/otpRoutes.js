const express = require("express");

const router = express.Router();

const {
  sendOTP,
  verifyOTP,
  createAccountAfterOTP,
} = require("../controllers/otpController");

console.log("🔥 OTP ROUTES LOADED");
console.log("sendOTP:", typeof sendOTP);
console.log("verifyOTP:", typeof verifyOTP);
console.log(
  "createAccountAfterOTP:",
  typeof createAccountAfterOTP
);

// =====================================================
// SEND OTP
// =====================================================

router.post(
  "/send",
  (req, res, next) => {
    console.log("🔥🔥🔥 /api/otp/send ROUTE HIT 🔥🔥🔥");
    next();
  },
  sendOTP
);

// =====================================================
// VERIFY OTP
// =====================================================

router.post(
  "/verify",
  (req, res, next) => {
    console.log("🔥🔥🔥 /api/otp/verify ROUTE HIT 🔥🔥🔥");
    next();
  },
  verifyOTP
);

// =====================================================
// COMPLETE PROFILE / CREATE ACCOUNT
// =====================================================

router.post(
  "/complete-profile",
  (req, res, next) => {
    console.log(
      "🔥🔥🔥 /api/otp/complete-profile ROUTE HIT 🔥🔥🔥"
    );
    next();
  },
  createAccountAfterOTP
);

// =====================================================
// EXPORT
// =====================================================

module.exports = router;