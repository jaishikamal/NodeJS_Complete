const db = require("../db");

exports.createUser = async ({ username, email, password, age }) => {
  const sql =
    "INSERT INTO users (username, email, password, age) VALUES (?, ?, ?, ?)";
  const [result] = await db.execute(sql, [username, email, password, age]);
  return result;
};
