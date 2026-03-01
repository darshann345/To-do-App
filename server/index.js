require("dotenv").config();  // Load environment variables from .env file

const app = require("./app");
const connectDB = require("./config/db");

// Connect to the database using the MONGO_URI from .env
connectDB();

// Use the PORT from environment variables (or default to 5000 if not set)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;