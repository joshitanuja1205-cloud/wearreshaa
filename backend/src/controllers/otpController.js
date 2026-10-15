const OTP = require("../models/OTP");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// =====================================================
// DEBUG
// =====================================================

console.log("OTP MODEL:", OTP);
console.log("OTP deleteMany:", typeof OTP.deleteMany);

// =====================================================
// GENERATE OTP
// =====================================================

const generateOTP = () => {
  return Math.floor(
    100000 + Math.random() * 900000
  ).toString();
};

// =====================================================
// CREATE JWT
// =====================================================

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// =====================================================
// CLEAN IDENTIFIER
// =====================================================

const cleanIdentifier = (identifier, type) => {
  if (type === "email") {
    return identifier.trim().toLowerCase();
  }

  return identifier.replace(/\D/g, "");
};

// =====================================================
// SEND OTP
// =====================================================

const sendOTP = async (req, res) => {
  console.log("🔥🔥🔥 SEND OTP CONTROLLER CALLED 🔥🔥🔥");

  try {
    const { identifier, type } = req.body;

    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

    if (!identifier || !type) {
      return res.status(400).json({
        success: false,
        message: "Identifier and type are required",
      });
    }

    if (!["email", "phone"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP type",
      });
    }

    // -------------------------------------------------
    // CLEAN IDENTIFIER
    // -------------------------------------------------

    const clean = cleanIdentifier(
      identifier,
      type
    );

    // -------------------------------------------------
    // PHONE VALIDATION
    // -------------------------------------------------

    if (type === "phone" && clean.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit phone number.",
      });
    }

    // -------------------------------------------------
    // GENERATE OTP
    // -------------------------------------------------

    const otp = generateOTP();

    const expiresAt = new Date(
      Date.now() + 5 * 60 * 1000
    );

    // -------------------------------------------------
    // LOG OTP
    // -------------------------------------------------

    console.log("=================================");
    console.log("🔐 OTP GENERATED");
    console.log("Type:", type);
    console.log("Identifier:", clean);
    console.log("OTP:", otp);
    console.log("Expires:", expiresAt);
    console.log("=================================");

    // -------------------------------------------------
    // DELETE OLD OTP
    // -------------------------------------------------

    await OTP.deleteMany({
      identifier: clean,
      type,
    });

    // -------------------------------------------------
    // SAVE NEW OTP
    // -------------------------------------------------

    await OTP.create({
      identifier: clean,
      otp,
      type,
      expiresAt,
      attempts: 0,
    });

    // -------------------------------------------------
    // RESPONSE
    // -------------------------------------------------

    return res.status(200).json({
      success: true,
      message: `OTP sent successfully to your ${type}`,
    });

  } catch (error) {

    console.error(
      "========== SEND OTP ERROR =========="
    );

    console.error(error);

    console.error(
      "===================================="
    );

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

// =====================================================
// VERIFY OTP
// =====================================================

const verifyOTP = async (req, res) => {
  try {
    const {
      identifier,
      otp,
      type,
    } = req.body;

    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

    if (!identifier || !otp || !type) {
      return res.status(400).json({
        success: false,
        message:
          "Identifier, OTP and type are required",
      });
    }

    if (!["email", "phone"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP type",
      });
    }

    // -------------------------------------------------
    // CLEAN IDENTIFIER
    // -------------------------------------------------

    const clean = cleanIdentifier(
      identifier,
      type
    );

    // -------------------------------------------------
    // FIND OTP
    // -------------------------------------------------

    const otpRecord = await OTP.findOne({
      identifier: clean,
      type,
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found",
      });
    }

    // -------------------------------------------------
    // CHECK EXPIRY
    // -------------------------------------------------

    if (otpRecord.expiresAt < new Date()) {

      await OTP.deleteOne({
        _id: otpRecord._id,
      });

      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // -------------------------------------------------
    // CHECK ATTEMPTS
    // -------------------------------------------------

    if (otpRecord.attempts >= 5) {

      await OTP.deleteOne({
        _id: otpRecord._id,
      });

      return res.status(429).json({
        success: false,
        message:
          "Too many incorrect attempts. Please request a new OTP.",
      });
    }

    // -------------------------------------------------
    // CHECK OTP
    // -------------------------------------------------

    if (otpRecord.otp !== otp) {

      otpRecord.attempts += 1;

      await otpRecord.save();

      return res.status(400).json({
        success: false,
        message: "Incorrect OTP",
      });
    }

    // -------------------------------------------------
    // OTP CORRECT
    // -------------------------------------------------

    await OTP.deleteOne({
      _id: otpRecord._id,
    });

    console.log("=================================");
    console.log("✅ OTP VERIFIED");
    console.log("Type:", type);
    console.log("Identifier:", clean);
    console.log("=================================");

    // =================================================
    // FIND USER
    // =================================================

    let user;

    if (type === "phone") {

      user = await User.findOne({
        phone: clean,
      });

    } else {

      user = await User.findOne({
        email: clean,
      });

    }

    // =================================================
    // NEW USER
    // =================================================

    if (!user) {

      console.log("🆕 NEW USER");
      console.log("Waiting for name...");

      return res.status(200).json({
        success: true,
        isNewUser: true,
        needsName: true,
        message:
          "OTP verified. Please enter your name.",

        verified: {
          type,
          identifier: clean,
        },
      });
    }

    // =================================================
    // EXISTING USER
    // =================================================

    console.log("👤 EXISTING USER:", user._id);

    // -------------------------------------------------
    // MARK VERIFIED
    // -------------------------------------------------

    if (type === "phone") {
      user.isPhoneVerified = true;
    }

    if (type === "email") {
      user.isEmailVerified = true;
    }

    await user.save();

    // -------------------------------------------------
    // CREATE TOKEN
    // -------------------------------------------------

    const token = createToken(user);

    // -------------------------------------------------
    // RETURN EXISTING USER
    // -------------------------------------------------

    return res.status(200).json({
      success: true,
      isNewUser: false,
      needsName: false,
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role,
      },
    });

  } catch (error) {

    console.error(
      "========== VERIFY OTP ERROR =========="
    );

    console.error(error);

    console.error(
      "======================================"
    );

    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
    });
  }
};

// =====================================================
// CREATE ACCOUNT AFTER OTP
// =====================================================

const createAccountAfterOTP = async (req, res) => {

  try {

    const {
      identifier,
      type,
      name,
    } = req.body;

    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

    if (!identifier || !type || !name) {

      return res.status(400).json({
        success: false,
        message:
          "Name, identifier and type are required",
      });
    }

    if (!["email", "phone"].includes(type)) {

      return res.status(400).json({
        success: false,
        message: "Invalid account type",
      });
    }

    // -------------------------------------------------
    // CLEAN NAME
    // -------------------------------------------------

    const cleanName = name.trim();

    if (cleanName.length < 2) {

      return res.status(400).json({
        success: false,
        message: "Please enter a valid name",
      });
    }

    // -------------------------------------------------
    // CLEAN IDENTIFIER
    // -------------------------------------------------

    const clean = cleanIdentifier(
      identifier,
      type
    );

    // =================================================
    // CHECK EXISTING USER
    // =================================================

    let existingUser;

    if (type === "phone") {

      existingUser = await User.findOne({
        phone: clean,
      });

    } else {

      existingUser = await User.findOne({
        email: clean,
      });

    }

    // -------------------------------------------------
    // ACCOUNT ALREADY EXISTS
    // -------------------------------------------------

    if (existingUser) {

      return res.status(409).json({
        success: false,
        message:
          "An account already exists with this information. Please login.",
      });
    }

    // =================================================
    // CREATE USER
    // =================================================

    let user;

    if (type === "phone") {

      user = await User.create({
        name: cleanName,
        phone: clean,
        isPhoneVerified: true,
      });

    } else {

      user = await User.create({
        name: cleanName,
        email: clean,
        isEmailVerified: true,
      });
    }

    console.log("=================================");
    console.log("🎉 ACCOUNT CREATED");
    console.log("User ID:", user._id);
    console.log("Name:", user.name);
    console.log("Type:", type);
    console.log("=================================");

    // =================================================
    // CREATE JWT
    // =================================================

    const token = createToken(user);

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({

      success: true,

      isNewUser: true,

      message:
        "Account created successfully",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email || "",
        phone: user.phone || "",
        role: user.role,
      },

    });

  } catch (error) {

    console.error(
      "========== CREATE ACCOUNT ERROR =========="
    );

    console.error(error);

    console.error(
      "==========================================="
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to create account",

    });
  }
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  sendOTP,
  verifyOTP,
  createAccountAfterOTP,
  createToken,
};