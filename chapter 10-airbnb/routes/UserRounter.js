//core module
const path = require("path");
const express = require("express");
const userRouter=express.Router();
const rootdir =required("../util/path")



userRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootdir,'views','home.html'));
});
module.exports =userRouter;