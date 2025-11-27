// core module
const path = require("path");
const express = require("express");

const Contact_usRouter = express.Router();
const rootdir = require("../util/path");

// GET contact page
Contact_usRouter.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootdir, "views", "contactus.html"));
});

// POST contact form
Contact_usRouter.post("/contact-us", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootdir, "views", "sucessfullContact.html"));
});

// EXPORT ROUTER (IMPORTANT!)
module.exports = Contact_usRouter;
