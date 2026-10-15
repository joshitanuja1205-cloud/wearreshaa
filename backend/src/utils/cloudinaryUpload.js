const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "reshAA/customizations",
      },
      (error, result) => {
        if (error) {
          console.error("CLOUDINARY STREAM ERROR:", error);
          reject(error);
          return;
        }

        console.log("CLOUDINARY UPLOAD SUCCESS:", result.secure_url);
        resolve(result);
      }
    );

    stream.end(buffer);
  });
};

module.exports = uploadToCloudinary;