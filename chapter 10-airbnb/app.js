//core module
const path=required('path');

//External module
const express = require("express");
const app = express();
//Local module
const userRouter = require("./routes/UserRounter");
const hostRouter = require("./routes/HostRounter");
const rootdir =required("./util/path")

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});
app.use(express.urlencoded());
app.use(userRouter);
// common path using express
app.use("/host",hostRouter);
app.use((req,res,next)=>{
  res.status(404).sendFile(path.join(rootdir,'views','404.html'))
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
