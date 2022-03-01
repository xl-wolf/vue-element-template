<template>
	<div class="app-main-container">
		<div id="BMap-container" />
		<div title="点击聚焦当前点" class="backCenter-BMap" @click="backToMapCenter" />
	</div>
</template>

<script>
import asyncBMapLoader from "@/utils/asyncBMapLoader"
import { style_1, style_2 } from "./style"
import { bmapPointsApi } from "@/apis/map"
export default {
	name: "BMap",
	data() {
		return {
			Bmap: null,
			curPositionPoint: null,
			currentPoints: [],
		}
	},
	mounted() {
		this.BMapCompletelyLoad()
	},
	methods: {
		// 完整加载百度地图与其插件
		BMapCompletelyLoad() {
			const vm = this
			asyncBMapLoader()
				.then((res) => {
					console.log(res)
					vm.initMap()
				})
				.catch((err) => {
					console.error("BMap加载失败", err)
					vm.$message.error("BMap加载失败")
				})
		},
		// 初始化地图
		async initMap() {
			const vm = this
			/*global BMap*/
			vm.Bmap = new BMap.Map("BMap-container")
			// vm.Bmap.setDefaultCursor('pointer')
			vm.Bmap.clearOverlays()
			const point = new BMap.Point(118.10388605, 24.48923061)
			vm.Bmap.centerAndZoom(point, 12) // 初始化地图,设置中心点坐标和地图级别
			vm.Bmap.setMapStyleV2({ styleJson: style_1 }) // 自定义地图
			// 浏览器获取当前定位
			let curPosiObj
			// try {
			//   curPosiObj = await vm.getCurPosition(vm.Bmap)
			//   console.log('当前定位信息', curPosiObj)
			// } catch (error) {
			//   console.log(error)
			//   vm.$message.error(error.msg)
			//   return
			// }
			vm.curPositionPoint = curPosiObj ? new BMap.Point(curPosiObj) : point
			console.log("vm.curPositionPoint", vm.curPositionPoint)
			const iconConfig = { url: require("./images/red.png"), size: { width: 48, height: 48 } }
			const mk = vm.addBMapMarker(vm.Bmap, vm.curPositionPoint, true, iconConfig)
			vm.generateNearBy10Markers(vm.Bmap, mk)
			vm.drawCircle(vm.Bmap)

			mk.addEventListener("click", function() {
				const windowConfig = {}
				vm.bdMapAddInfoWindow(windowConfig, this, true, vm.Bmap)
			})
			mk.enableDragging() //点标记可拖拽
			// mk.disableDragging() //点标记不可拖拽

			mk.addEventListener("dragend", function(e) {
				// console.log(e)
				vm.curPositionPoint = e.point
				vm.Bmap.panTo(vm.curPositionPoint)
				const allMarkers = vm.Bmap.getOverlays()
				// 移除自身以外的其他点标记
				allMarkers.forEach((marker) => {
					if (marker !== this) {
						vm.removeBMapMarker(vm.Bmap, marker)
					}
				})
				// 随机生成当前位置旁边的10个点标记
				vm.generateNearBy10Markers(vm.Bmap, e)
				vm.drawCircle(vm.Bmap, 7000)
			})

			vm.Bmap.centerAndZoom(vm.curPositionPoint, 12) // 初始化地图,设置中心点坐标和地图级别
			vm.Bmap.enableScrollWheelZoom(true) // 设置鼠标滚轮地图放大缩小
			vm.Bmap.setMapStyleV2({ styleJson: style_1 }) // 自定义地图样式，可结合百度地图内部提供编辑器自定义样式

			// 生成点聚合
			// vm.addBMapMarkerClusterer(vm.Bmap)
			// 添加工具条和比例尺
			vm.controllerTools(vm.Bmap)
		},
		// 移除点标记
		removeBMapMarker(bmap, marker) {
			if (marker) {
				// 移除指定点标记
				bmap.removeOverlay(marker)
			}
		},
		// 添加点标记
		addBMapMarker(bmap, point, animation, iconConfig) {
			let marker
			if (iconConfig) {
				const { url, size } = iconConfig
				const icon = new BMap.Icon(url, new BMap.Size(size["width"], size["height"]))
				marker = new BMap.Marker(point, { icon })
			} else {
				marker = new BMap.Marker(point)
			}
			bmap.addOverlay(marker)
			animation && marker.setAnimation(BMAP_ANIMATION_DROP) //跳动的动画 移动端无效
			return marker
		},
		// 随机生成当前位置旁边的10个点标记-->后期的ajax请求
		async generateNearBy10Markers(map, e) {
			const vm = this
			const currentPosition = [e.point["lng"] + (Math.random() - 0.5) * 0.08, e.point["lat"] + (Math.random() - 0.5) * 0.08]
			const reqParams = { currentPosition: currentPosition }
			const bmapRes = await bmapPointsApi(reqParams)
			console.log("bmapPointsApi", bmapRes)
			const points = bmapRes.data
			for (let i = 0; i < points.length; i++) {
				const point = new BMap.Point(...points[i])
				// 把地图上所有的点压人当前地图内的点数组
				vm.currentPoints.push(point)
				const iconConfig = { url: require("./images/blue.png"), size: { width: 20, height: 20 } }
				const marker = vm.addBMapMarker(map, point, true, iconConfig)
				marker.dataId = i
				marker.addEventListener("click", function() {
					const windowConfig = {}
					vm.bdMapAddInfoWindow(windowConfig, this, false, map)
				})
			}
		},
		// 添加信息窗口
		bdMapAddInfoWindow(windowConfig, marker, isCurrent, bmap) {
			// console.log(marker)
			const opts = windowConfig
			const { lat, lng } = marker.point
			const { dataId } = marker
			const point = new BMap.Point(lng, lat)
			const sContent = isCurrent
				? `<div id=${dataId} style='cursor:pointer'><div>拖动当前点获取信息</div></div>`
				: `<div id=${dataId} style='cursor:pointer;'><div style='display:inline-block;margin:0 0 5px 0;padding:0.2em 0'>客户名称：</div><div>建设银行厦门科技支行${dataId}</div></div>`

			const infoWindow = new BMap.InfoWindow(sContent, opts) // 创建信息窗口对象
			// 判断窗口的打开状态
			if (!infoWindow.isOpen()) {
				//如果没有打开，则监听打开事件，获取按钮，添加事件
				infoWindow.addEventListener("open", function() {
					document.getElementById(dataId).onclick = function(e) {
						console.log("infoWindow noopened：", dataId)
					}
				})
			}
			bmap.openInfoWindow(infoWindow, point) //开启信息窗口
		},
		// 生成点聚合
		addBMapMarkerClusterer(bmap) {
			const vm = this
			const markers = []
			let pt = null
			let i = 0
			for (; i < 200; i++) {
				pt = new BMap.Point(Math.random() * 40 + 85, Math.random() * 30 + 21)
				const iconConfig = { url: require("./images/blue.png"), size: { width: 20, height: 20 } }
				const markerInClusterer = vm.addBMapMarker(vm.Bmap, pt, true, iconConfig)
				// 为点聚合内的点注册点击事件
				markerInClusterer.addEventListener("click", (pt) => {
					// 点击事件异步执行，需要闭包管理每个回调函数的专属变量pt
					return ((pt) => {
						// 点击点标记则把改点定位到地图中心
						bmap.panTo(pt.point)
					})(pt)
				})
				markers.push(markerInClusterer)
				// 自定义点标记样式可以通过百度地图的BMap.Icon类实现
			}
			// 生成点聚合并自定义点聚合样式 可采用两种方式导入自定义聚合点样式文件 common.js规范和ES6 module规范
			// const styles = require('./clustererStylesCommonJS')
			import("./clustererStylesES6").then((clustererStylesES6) => {
				const styles = clustererStylesES6.default
				new BMapLib.MarkerClusterer(bmap, { markers, styles })
			})
			// const markerClusterer =
			// new BMapLib.MarkerClusterer(bmap, { markers, styles })
			// 自定义点聚合样式也可在MarkerClusterer构造函数的第二个参数中加入styles属性，直接将样式写入，如上styles，两种方式都行
			// markerClusterer.setStyles(myStyles)
		},
		// 浏览器获取当前定位
		getCurPosition(bmap) {
			return new Promise((resolve, reject) => {
				const geolocation = new BMap.Geolocation()
				geolocation.getCurrentPosition(
					function(r) {
						if (this.getStatus() == BMAP_STATUS_SUCCESS) {
							resolve({ r: r, lng: r.point.lng, lat: r.point.lat })
						} else {
							reject({ msg: "获取定位失败", map: bmap })
						}
					},
					{ enableHighAccuracy: true }
				)
				//关于状态码
				//BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
				//BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
				//BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
				//BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
				//BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
				//BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
				//BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
				//BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
				//BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
			})
		},
		// 添加工具条和比例尺
		controllerTools(bmap) {
			// const top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }) // 左上角，添加比例尺
			const top_left_navigation = new BMap.NavigationControl({
				// 靠左上角位置
				anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
				// LARGE类型
				type: BMAP_NAVIGATION_CONTROL_LARGE,
				// 启用显示定位
				// enableGeolocation: true
			})
			//添加控件和比例尺
			bmap.addControl(top_left_navigation)
		},
		// 返回地图中心点（当前定位点）
		backToMapCenter() {
			const vm = this
			vm.Bmap.panTo(vm.curPositionPoint)
		},
		// 画圆
		drawCircle(
			bmap,
			radius = 5000,
			circleConfig = {
				strokeColor: "#f0f",
				fillColor: "#00f",
				strokeWeight: 1,
				strokeOpacity: 0.7,
				fillOpacity: 0.2,
				strokeStyle: "dashed",
			}
		) {
			const vm = this
			const BmapCircle = new BMap.Circle(vm.curPositionPoint, radius, circleConfig)
			bmap.addOverlay(BmapCircle)
			// 根据地图上的所有点位置把地图的放大级别调整到合适级别
			// bmap.setViewport(vm.currentPoints)
			console.log(vm.currentPoints)
			vm.currentPoints = []
		},
	},
}
</script>

<style lang="scss">
#BMap-container {
	position: relative;
	min-width: 750px;
	height: inherit;
	min-height: 600px;
	font-size: 14px;
	.BMap_stdMpCtrl.BMap_stdMpType1.BMap_noprint.anchorBR {
		bottom: 20px !important;
	}
	.BMap_stdMpCtrl.BMap_stdMpType0.BMap_noprint.anchorBR {
		bottom: 40px !important;
	}
}
.backCenter-BMap {
	width: 20px;
	height: 20px;
	position: absolute;
	top: 40px;
	left: 40px;
	cursor: pointer;
	z-index: 7;
	background-image: url("./images/BKC-44--cyan.png");
	background-repeat: no-repeat;
	background-size: contain;
}
</style>
