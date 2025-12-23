// db.js
const mysql = require("mysql2/promise"); // <--- promise version

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cookie_and_session",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;
