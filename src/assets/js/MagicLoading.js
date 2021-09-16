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
let animationId = null
const loop = (fillStyles = defaultFillStyles) => {
	animationId = requestAnimationFrame(loop.bind(null, fillStyles))
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

const defaultPosi = `
	position:fixed;
	top:0;
	right:0;
	bottom:0;
	left:0;
	z-index:99;
	margin:auto;
	`
// canvas位置设置
const setPosition = (positionStyleText = defaultPosi) => {
	canvas.style.cssText = positionStyleText
}
// canvas的可见性设置
const setVisible = () => {
	canvas.style.cssText += `opacity:0.7;visibility:visible;`
}
// 隐藏canvas
const setHidden = () => {
	canvas.style.cssText += `visibility:hidden;`
}

const maskDom = document.createElement("div")
const defaultMaskPosition = `
	position:fixed;
	top:0;
	height:100%;
	width:100%;
	z-index:99;
`
const setMaskPosition = (maskStyle = defaultMaskPosition) => {
	maskDom.style.cssText = maskStyle
}
const defaultMaskBgColor = `background:rgba(0,0,0,0.5)`
const setMaskBgColor = (maskStyle = defaultMaskBgColor) => {
	maskDom.style.cssText += maskStyle
}
const setMask = (containerDom) => {
	setMaskPosition()
	setMaskBgColor()
	containerDom.appendChild(maskDom)
}

const removeMask = (containerDom) => {
	containerDom.removeChild(maskDom)
}

// 第一套loading方案，dom树干净，不过dom操作过于频繁，性能不够友好
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
// 第二套loading方案，性能友好，不过dom树上会挂上过多的dom节点
export const showLoading = function(containerDom, fillStyles, positionStyleText, isMasked = true) {
	loop(fillStyles)
	setPosition(positionStyleText)
	setVisible()
	isMasked && setMask(containerDom)
	try {
		containerDom.appendChild(canvas)
	} catch (error) {
		throw error
	}
}
const clearAnimationFrame = () => animationId && cancelAnimationFrame(animationId)
export const hideLoading = function() {
	setHidden()
	clearAnimationFrame()
	setMaskPosition("")
}
