
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");
const { sendOrderEmails } = require("../services/emailService");

// ================= CREATE ORDER =================

const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Check required fields
    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Shipping address and payment method are required",
      });
    }

    // Get user's cart
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Prepare order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      customizationId: item.customizationId || null,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      size: item.size,
      color: {
        name: item.color.name,
        hex: item.color.hex,
      },
    }));

    // Calculate subtotal
    const subtotal = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Shipping fee: free for orders of ₹999 or more
    const shippingFee = subtotal >= 999 ? 0 : 99;

    // Calculate total
    const totalAmount = subtotal + shippingFee;

    // Save order to MongoDB
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      subtotal,
      shippingFee,
      totalAmount,
      paymentMethod,
    });

    // Clear cart after successfully saving the order
    cart.items = [];
    await cart.save();

    // Trigger order emails after saving the order.
    // Email errors must not fail checkout.
    const customerId = req.user._id;
    const orderForEmail = order;

    setImmediate(async () => {
      try {
        const customer = await User.findById(customerId).select("email");

        await sendOrderEmails(orderForEmail, customer?.email);
      } catch (emailError) {
        console.error(
          "Order email processing failed:",
          emailError.message
        );
      }
    });

    // Return successful checkout response
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

// ================= GET MY ORDERS =================

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// ================= GET ORDER BY ID =================

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.user._id,
    }).populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get order error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};

// ================= EXPORTS =================

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
};
