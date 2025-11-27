//core module 
const path = require('path');
//External module
const express = require('express');
const hostRouter = express.Router();
const rootdir = require("../util/path")

hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootdir, 'views', 'addhome.html'));
});
hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootdir, 'views', 'homeedit.html'));
});
module.exports = hostRouter;
