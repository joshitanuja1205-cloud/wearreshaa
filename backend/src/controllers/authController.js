const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");

// =====================================================
// GOOGLE OAUTH CLIENT
// =====================================================

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

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
// PROTECT ROUTES
// =====================================================

const protect = async (req, res, next) => {
  try {
    let token;

    // -------------------------------------------------
    // GET TOKEN FROM AUTHORIZATION HEADER
    // -------------------------------------------------

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // -------------------------------------------------
    // NO TOKEN
    // -------------------------------------------------

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login.",
      });
    }

    // -------------------------------------------------
    // VERIFY TOKEN
    // -------------------------------------------------

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // -------------------------------------------------
    // FIND USER
    // -------------------------------------------------

    const user = await User.findById(decoded.id).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    // -------------------------------------------------
    // ATTACH USER TO REQUEST
    // -------------------------------------------------

    req.user = user;

    next();

  } catch (error) {
    console.error(
      "Auth middleware error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired login session.",
    });
  }
};

// =====================================================
// GET CURRENT USER
// =====================================================

const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });

  } catch (error) {

    console.error(
      "Get me error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to get user",
    });
  }
};

// =====================================================
// GOOGLE LOGIN
// =====================================================

const googleLogin = (req, res) => {
  try {
    const redirect =
      req.query.redirect === "/checkout"
        ? "/checkout"
        : "/";

    const url = googleClient.generateAuthUrl({
      access_type: "offline",

      scope: [
        "openid",
        "profile",
        "email",
      ],

      prompt: "select_account",

      state: redirect,
    });

    res.redirect(url);

  } catch (error) {
    console.error(
      "Google login error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to start Google login",
    });
  }
};

// =====================================================
// GOOGLE CALLBACK
// =====================================================

const googleCallback = async (req, res) => {
  try {

    const { code, state } = req.query;

    // -------------------------------------------------
    // CHECK CODE
    // -------------------------------------------------

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Google authorization code missing",
      });
    }

    // -------------------------------------------------
    // EXCHANGE CODE FOR GOOGLE TOKENS
    // -------------------------------------------------

    const { tokens } =
      await googleClient.getToken(code);

    // -------------------------------------------------
    // VERIFY GOOGLE ID TOKEN
    // -------------------------------------------------

    const ticket =
      await googleClient.verifyIdToken({
        idToken: tokens.id_token,
        audience:
          process.env.GOOGLE_CLIENT_ID,
      });

    const payload =
      ticket.getPayload();

    // -------------------------------------------------
    // GOOGLE USER DATA
    // -------------------------------------------------

    const {
      sub: googleId,
      email,
      name,
      email_verified,
    } = payload;

    if (!email) {
      return res.status(400).json({
        success: false,
        message:
          "Google account email not available",
      });
    }

    const cleanEmail =
      email.toLowerCase().trim();

    // =================================================
    // FIND EXISTING USER
    // =================================================

    let user = await User.findOne({
      $or: [
        {
          googleId: googleId,
        },
        {
          email: cleanEmail,
        },
      ],
    });

    // =================================================
    // EXISTING USER
    // =================================================

    if (user) {

      // Connect Google account if
      // this user originally logged in
      // through phone/email.

      if (!user.googleId) {
        user.googleId = googleId;
      }

      if (email_verified) {
        user.isEmailVerified = true;
      }

      await user.save();

      console.log(
        "✅ Existing user logged in with Google"
      );

    }

    // =================================================
    // NEW USER
    // =================================================

    else {

      user = await User.create({
        name:
          name ||
          "RESHAA User",

        email: cleanEmail,

        googleId,

        isEmailVerified:
          !!email_verified,

        role: "user",
      });

      console.log(
        "🎉 New Google user created"
      );
    }

    // =================================================
    // CREATE RESHAA JWT
    // =================================================

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const redirect =
      state === "/checkout"
        ? "/checkout"
        : "/";


    // =================================================
    // REDIRECT TO FRONTEND
    // =================================================
res.redirect(
  `http://localhost:5173/google-success?token=${token}&redirect=${encodeURIComponent(redirect)}`
);

  } catch (error) {

    console.error(
      "Google callback error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Google authentication failed",
    });
  }
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  createToken,
  protect,
  getMe,
  googleLogin,
  googleCallback,
};