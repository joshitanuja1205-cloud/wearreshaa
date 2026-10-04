const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // ================= BASIC INFO =================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Graphic Tees",
        "Essentials",
        "Custom Tees",
      ],
    },

    // ================= PRICING =================

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    compareAtPrice: {
      type: Number,
      min: 0,
      default: null,
    },

    // ================= PRODUCT IMAGES =================

    images: [
      {
        type: String,
        trim: true,
      },
    ],

    // ================= VARIANTS =================

    colors: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },

        hex: {
          type: String,
          trim: true,
        },

        stock: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],

    sizes: [
      {
        type: String,
        enum: [
          "XS",
          "S",
          "M",
          "L",
          "XL",
          "XXL",
        ],
      },
    ],

    // ================= INVENTORY =================

    totalStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ================= PRODUCT DETAILS =================

    material: {
      type: String,
      trim: true,
    },

    gsm: {
      type: Number,
      min: 0,
    },

    fit: {
      type: String,
      trim: true,
    },

    tag: {
      type: String,
      trim: true,
    },

    // ================= STORE FLAGS =================

    isNewArrival: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isCustomizable: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);