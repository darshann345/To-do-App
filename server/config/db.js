const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri); // No need to add `useNewUrlParser` or `useUnifiedTopology` anymore
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

module.exports = connectDB;