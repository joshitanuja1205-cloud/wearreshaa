const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");


const app = express();

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