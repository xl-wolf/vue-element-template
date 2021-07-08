const express = require("express");
const app = express();

const router = require("./apis/index");

const cors = require("cors")();

app.use(cors);
app.use("", router);

app.listen(6067, () => {
  console.log("服务已经开启，运行端口6067");
});
