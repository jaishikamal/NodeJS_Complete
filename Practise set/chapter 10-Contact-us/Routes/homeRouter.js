// core module
const path = require("path");
const express = require("express");

const homeRouter = express.Router();
const rootdir = require("../util/path");

homeRouter.get("/", (req, res, next) => {
  console.log("Handling / for GET", req.url, req.method);
  res.sendFile(path.join(rootdir, "views", "home.html"));
});

module.exports = homeRouter;
