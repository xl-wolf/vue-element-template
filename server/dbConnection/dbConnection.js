// 创建 mysql 连接池资源
const pool = require("./databasePool")
module.exports.sqlExcutor = (sql) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err)
				throw err
			}
			connection.query(sql, (error, results, fields) => {
				if (error) {
					reject(error)
				} else {
					resolve({ results, fields })
				}
			})
		})
	})
}
