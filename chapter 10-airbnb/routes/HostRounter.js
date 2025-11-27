//core module 
const path =require('path');
//External module
const express =require('express'); 
const hostRouter = express.Router();
const rootdir =required("../util/path")

hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootdir,'views','home.html'));
});
hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootdir,'views','homeeddit.html'));
});
module.exports=hostRouter;
