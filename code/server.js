const express = require("express");
const mysql = require("mysql2/promise"); // ✅ Promise-based MySQL
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config(); // 🔹 Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key"; // 🔹 Secure JWT key

app.use(bodyParser.json());
app.use(cors()); // ✅ Enable CORS for frontend requests

// ✅ MySQL Database Connection (Using Pool)
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "nitin123@",
  database: process.env.DB_NAME || "auction_db",
  connectionLimit: 10,
});

// ✅ Test MySQL Connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connected to MySQL Database!");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL Connection Failed:", error);
    process.exit(1); // Stop server if database connection fails
  }
})();

// ✅ Register User API
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);

    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// ✅ User Login API (Improved)
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    // ✅ Check if user exists
    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: "User not found!" });
    }

    const user = users[0];

    // ✅ Verify Password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: "Incorrect password!" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ success: true, message: "✅ Login successful!", token });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
});

// ✅ Fetch Auction Items API
app.get("/api/items", async (req, res) => {
  try {
    const [items] = await db.query("SELECT * FROM auction_items");
    res.json(items);
  } catch (error) {
    console.error("❌ Error fetching items:", error);
    res.status(500).json({ message: "Server error fetching items" });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
