// Core Module
const path = require("path");

// External Module
const express = require("express");

// Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/Error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// ✅ FIXED
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(storeRouter);
app.use("/host", hostRouter);

// Static files
app.use(express.static(path.join(rootDir, "public")));

// 404 Page
app.use(errorsController.pageNotFound);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
