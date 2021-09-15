let M = Math,
	PI = M.PI,
	TWOPI = PI * 2,
	HALFPI = PI / 2,
	canvas = document.createElement("canvas"),
	ctx = canvas.getContext("2d"),
	width = (canvas.width = 200),
	height = (canvas.height = 200),
	cx = width / 2,
	cy = height / 2,
	count = 40,
	sizeBase = 0.1,
	sizeDiv = 10,
	tick = 0

ctx.translate(cx, cy)
const defaultFillStyles = ["hsl(200, 70%, 50%)", "hsl(200, 70%, 50%)", "hsl(200, 70%, 50%)", "hsl(200, 70%, 50%)"]
const loop = (fillStyles = defaultFillStyles) => {
	requestAnimationFrame(loop.bind(null, fillStyles))
	ctx.clearRect(-width / 2, -height / 2, width, height)
	ctx.fillStyle = "#fff"
	let angle = tick / 8,
		radius = -50 + M.sin(tick / 15) * 20,
		size

	for (let i = 0; i < count; i++) {
		angle += PI / 64
		radius += i / 30
		size = sizeBase + i / sizeDiv

		ctx.beginPath()
		ctx.arc(M.cos(angle) * radius, M.sin(angle) * radius, size, 0, TWOPI, false)
		ctx.fillStyle = fillStyles[0]
		ctx.fill()

		ctx.beginPath()
		ctx.arc(M.cos(angle) * -radius, M.sin(angle) * -radius, size, 0, TWOPI, false)
		ctx.fillStyle = fillStyles[1]
		ctx.fill()

		ctx.beginPath()
		ctx.arc(M.cos(angle + HALFPI) * radius, M.sin(angle + HALFPI) * radius, size, 0, TWOPI, false)
		ctx.fillStyle = fillStyles[2]
		ctx.fill()

		ctx.beginPath()
		ctx.arc(M.cos(angle + HALFPI) * -radius, M.sin(angle + HALFPI) * -radius, size, 0, TWOPI)
		ctx.fillStyle = fillStyles[3]
		ctx.fill()
	}
	tick++
}

const defaultPosi = "\
	position:fixed;\
	top:0;\
	right:0;\
	bottom:0;\
	left:0;\
	z-index:99;\
	margin:auto;\
	opacity:0.7;\
"
const setPosition = (positionStyleText = defaultPosi) => {
	canvas.style.cssText = positionStyleText
}

let maskDom = document.createElement("div")
let defaultMaskStyle = "\
	position:fixed;\
	top:0;\
	background:rgba(0,0,0,0.5);\
	height:100%;\
	width:100%;\
	z-index:99;\
"
const setMask = (containerDom, maskStyle = defaultMaskStyle) => {
	maskDom.style.cssText = maskStyle
	containerDom.appendChild(maskDom)
}

const removeMask = (containerDom) => {
	containerDom.removeChild(maskDom)
}
/**
 *
 * @param {loading的容器} containerDom
 * @param {loading的样式} fillStyles
 * @param {loading的位置样式文本} positionStyleText
 * @param {loading的时候是否显示蒙层} isMasked
 */
export const mountLoading = function(containerDom, fillStyles, positionStyleText, isMasked = true) {
	loop(fillStyles)
	setPosition(positionStyleText)
	isMasked && setMask(containerDom)
	try {
		containerDom.appendChild(canvas)
	} catch (error) {
		throw error
	}
}
export const destroyLoading = function(containerDom) {
	try {
		containerDom.removeChild(canvas)
		maskDom && removeMask(containerDom)
	} catch (error) {
		throw error
	}
}
