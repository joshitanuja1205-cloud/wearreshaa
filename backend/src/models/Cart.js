const mongoose = require("mongoose");

// =====================================================
// CART ITEM
// =====================================================

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    customizationId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Customization",
  default: null,
},

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    size: {
      type: String,
      required: true,
    },

    color: {
      name: {
        type: String,
        required: true,
      },

      hex: {
        type: String,
      },
    },
  },
  {
    _id: true,
  }
);

// =====================================================
// CART
// =====================================================

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);