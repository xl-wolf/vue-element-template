const mysql = require("mysql")
const { host } = require("./serverUrl")
const { user, password } = require("./user")
const connectionPool = mysql.createPool({
	host: host, //数据库所在服务器地址
	user: user, //用户名
	password: password, //密码
	database: "test", //数据库名
	port: 3306, //数据库端口
})

module.exports = connectionPool
