const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const Customization = require("../models/Customization");

const router = express.Router();

router.post("/", upload.single("reference"), async (req, res) => {
  try {
    const {
      color,
      size,
      quantity,
      designType,
      text,
      font,
      idea,
      vibe,
      important,
      placement,
    } = req.body;

    let reference = null;

    // Upload reference image to Cloudinary
    if (req.file) {
      console.log("FILE RECEIVED:", {
        name: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        bufferLength: req.file.buffer?.length,
      });

      const result = await uploadToCloudinary(req.file.buffer);

      console.log("CLOUDINARY RESULT:", result.secure_url);

      reference = {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    const customization = await Customization.create({
  color,
  size,
  quantity: Number(quantity),
  designType,
  text,
  font,
  idea,
  vibe,
  important,
  placement,
  reference,
});
   console.log("CUSTOMIZATION SAVED TO MONGODB:");
console.log(customization);
    res.status(201).json({
      success: true,
      message: "Customization request received successfully.",
      customization,
    });
  } catch (error) {
    console.error("Customization upload error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit customization request.",
      error: error.message,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const customizations = await Customization.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: customizations.length,
      customizations,
    });
  } catch (error) {
    console.error("Fetch customizations error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch customization requests.",
      error: error.message,
    });
  }
});
module.exports = router;