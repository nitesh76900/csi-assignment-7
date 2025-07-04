const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.DATABASE_URI || ""
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
