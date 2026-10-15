const mongoose = require("mongoose");

const referenceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    size: {
      type: Number,
    },
    url: {
      type: String,
    },
    publicId: {
      type: String,
    },
  },
  { _id: false }
);

const customizationSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    designType: {
      type: String,
    },

    text: {
      type: String,
    },

    font: {
      type: String,
    },

    idea: {
      type: String,
    },

    vibe: {
      type: String,
    },

    important: {
      type: String,
    },

    placement: {
      type: String,
    },

    reference: {
      type: referenceSchema,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customization", customizationSchema);