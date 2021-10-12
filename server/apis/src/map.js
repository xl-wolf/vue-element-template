const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

// 高德地图点
router.get("/amap/points", (req, res) => {
	// console.log(req.query);
	const { currentPosition } = req.query
	// 随机生成前端传过来的点附近的10个点
	const points = []
	for (let i = 0; i < 10; i++) {
		points.push([(Number(currentPosition[0]) + (Math.random() - 0.5) * 0.08).toFixed(6), (Number(currentPosition[1]) + (Math.random() - 0.5) * 0.08).toFixed(6)])
	}
	res.json({ status: "200", data: points })
})
// 百度地图点
router.get("/bmap/points", (req, res) => {
	// console.log(req.query);
	const { currentPosition } = req.query
	// 随机生成前端传过来的点附近的10个点
	const points = []
	for (let i = 0; i < 10; i++) {
		points.push([(Number(currentPosition[0]) + (Math.random() - 0.5) * 0.08).toFixed(6), (Number(currentPosition[1]) + (Math.random() - 0.5) * 0.08).toFixed(6)])
	}
	res.json({ status: "200", data: points })
})

module.exports = router
