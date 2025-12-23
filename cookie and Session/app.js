const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./db");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");  
const JWT_SECRET = "hello";

// Middleware
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/users", async (req, res) => {
  try {
    const { username, email, password, age } = req.body;
    


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    const sql =
      "INSERT INTO users (username, email, password, age) VALUES (?, ?, ?, ?)";
    const [result] = await db.execute(sql, [username, email, hashedPassword, age]);

    // Create JWT after insertion
    const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, { expiresIn: "1h" });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.send("✅ User created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});
//login get 
app.get("/login", (req, res) => {
  res.render("login");
});

//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in DB
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) return res.send("❌ User not found");

    const user = rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("❌ Wrong password");

    // Create JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.send("✅ Login successful");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// Logout
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("✅ Logged out");
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
