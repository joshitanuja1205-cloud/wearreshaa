 const express = require("express");

const {
  getAllOrders,
  getOrderByIdAdmin,
  updateOrderStatus,
} = require("../controllers/adminOrderController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// All admin order routes require authentication and admin role
router.use(protect, adminOnly);

router.get("/", getAllOrders);
router.get("/:orderId", getOrderByIdAdmin);
router.patch("/:orderId/status", updateOrderStatus);

module.exports = router;
