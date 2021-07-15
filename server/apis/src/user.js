const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const DB = require("../../dbConnection/dbConnection");
const utils = require("../../utils/index");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// 注册
router.post("/user/register", (req, res) => {
  // console.log(req.body)
  let { uname, upwd } = req.body;
  if (!uname || !upwd) {
    res.json({ status: "500", msg: "用户名和密码不能为空" });
  }
  if (utils.checkPhoneRegExp(uname)) {
    res.json({ status: "400", msg: "手机格式不正确" });
  }
  let sql = `SELECT * FROM user_info WHERE uname = '${uname}' AND upwd = '${upwd}'`;
  DB.sqlExcutor(sql)
    .then((resData) => {
      let { fields, results } = resData;
      if (results.length > 0) {
        res.json({ status: "500", msg: "用户名已存在" });
      } else {
        let sql = `INSERT INTO user_info (uid,uname, upwd) VALUES (null, ${uname},${upwd})`;
        DB.sqlExcutor(sql).then((resData) => {
          let { fields, results } = resData;
          if (results.affectedRows > 0) {
            res.json({ status: "200", msg: "注册成功" });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// 登录
router.post("/user/login", (req, res) => {
  // console.log("req.body", req);
  const { username, password } = req.query;
  let resData = null;
  switch (username) {
    case "admin":
      resData = {
        token: "admin",
        role: "admin",
        projectName: "xl-wolf",
        avatar: "https://avatars0.githubusercontent.com/u/45027348?s=60&v=4",
      };
      break;
    case "guest":
      resData = {
        token: "guest",
        role: "guest",
        projectName: "guest",
        avatar: "https://avatars0.githubusercontent.com/u/45027348?s=60&v=4",
      };
      break;
    default:
      break;
  }
  res.json({ status: "200", msg: "登录成功", data: resData });
  // const sql = `SELECT * FROM user_info WHERE uname = '${uname}' AND upwd = '${upwd}'`;
  // DB.sqlExcutor(sql)
  //   .then((resData) => {
  //     console.log(resData);
  //     let { fields, results } = resData;
  //     if (results.length > 0) {
  //       res.json({ status: "200", msg: "登录成功" });
  //     } else {
  //       res.json({ status: "500", msg: "用户名或密码错误" });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

// 登出
router.post("/user/logout", (req, res) => {
  res.json({ status: "200", msg: "登出成功" });
});

module.exports = router;
