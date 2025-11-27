// External Module
const express = require("express");
const path = require("path");
const app = express();

// Local modules
const homeRouter = require("./Routes/homeRouter");
const contactUsRouter = require("./Routes/Contact_usRouter");
const rootdir = require("./util/path");

// Print req.url and req.method
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded());

// Routers
app.use(homeRouter);
app.use(contactUsRouter);

// 404 Page
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootdir, "views", "404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
