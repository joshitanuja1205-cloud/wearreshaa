const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const customizationRoutes = require("./routes/customizationRoutes");
const otpRoutes = require("./routes/otpRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const app = express();
console.log("ROUTE TYPES:", {
  productRoutes: typeof productRoutes,
  authRoutes: typeof authRoutes,
  cartRoutes: typeof cartRoutes,
  orderRoutes: typeof orderRoutes,
  customizationRoutes: typeof customizationRoutes,
  otpRoutes: typeof otpRoutes,
  adminOrderRoutes: typeof adminOrderRoutes,
});
// ================= SECURITY =================

app.use(helmet());

// ================= CORS =================

app.use(cors());

// ================= REQUEST LOGGING =================

app.use(morgan("dev"));

// ================= PARSE JSON =================

app.use(express.json());

// ================= ROUTES =================

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customizations", customizationRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// ================= HEALTH CHECK =================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "RESHAA backend is running",
  });
});

// ================= ROOT =================

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to RESHAA API",
  });
});

module.exports = app;