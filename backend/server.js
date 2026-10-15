require("dotenv").config({
  path: require("path").join(__dirname, ".env"),
});
console.log(
  "📧 Server Resend key loaded:",
  Boolean(process.env.RESEND_API_KEY)
);
const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    console.log("🧪 startServer() called");

    await connectDB();

    console.log("🧪 connectDB() finished");

    app.listen(PORT, () => {
      console.log(`🚀 RESHAA backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();