<template>
  <div class="app-main-container">
    <div id="AMap-container" />
    <div title="点击聚焦当前点" class="backCenter-AMap" @click="backToMapCenter" />
  </div>
</template>

<script>
import asyncAMapLoader from '@/utils/asyncAMapLoader'
import { style1, style2, style3 } from './mapStyles'
export default {
  name: 'AMap',
  data() {
    return {
      Amap: null,
      currentPosition: [118.10388605, 24.48923061],
      curMarkersArray: [],
      circle: null
    }
  },
  mounted() {
    this.loadMapFromOfficialAddr()
  },
  methods: {
    loadMapFromOfficialAddr() {
      asyncAMapLoader('AMap').then(
        AMap => {
          console.log(AMap)
          this.initMap()
        },
        err => {
          console.log('AMap加载失败', err)
          this.$message.error('AMap加载失败')
        }
      )
    },
    async initMap() {
      const vm = this
      // 实例化一个高德地图并取得引用
      vm.Amap = new AMap.Map('AMap-container', {
        resizeEnable: true,
        zoom: 12,
        center: vm.currentPosition,
        pitch: 45, // 地图俯仰角度，有效范围 0 度- 83 度
        viewMode: '3D', // 地图模式
        mapStyle: style2 //自定义地图样式，需要线上定制发布后使用
      })
      // 浏览器获取当前定位
      // const cur = await vm.getCurrentPosition()
      // console.log(cur)
      // const curPoint =
      // vm.addAmapmarker(vm.Amap, cur.position)

      // 添加点标记
      const icon = new AMap.Icon({
        size: new AMap.Size(48, 48),
        image: require('./images/red.png'), //自定义icon
        imageSize: new AMap.Size(48, 48),
        imageOffset: new AMap.Pixel(0, 0)
      })
      const mk = vm.addAMapMarker(icon, vm.currentPosition, true)
      // 画圆
      const circleOpt = {
        map: vm.Amap,
        center: vm.currentPosition,
        radius: 5000,
        strokeColor: '#0ff',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#f2f',
        fillOpacity: 0.7,
        strokeStyle: 'dashed'
      }
      vm.drawCircle(circleOpt)

      mk.on('click', function(self) {
        const position = self.lnglat
        // console.log(this, position, self)
        const contentInfo = `拖动当前点获取商机点信息`
        const content = `<div>${contentInfo}</div>`
        const infoWindowOpts = {
          // isCustom: true, //使用自定义窗体
          content: content,
          offset: new AMap.Pixel(0, -4)
        }
        const infoWinRef = vm.addAMapInfoWindow(infoWindowOpts)
        infoWinRef.open(vm.Amap, position)
      })
      mk.on('dragend', function(self) {
        // console.log(self)
        // 移除信息窗口
        vm.removeAMapInfoWindow()
        // 对当前地图定位点重新赋值
        vm.currentPosition = [self['lnglat'].lng, self['lnglat'].lat]
        // 移动定位点至当前地图中心
        vm.Amap.panTo(vm.currentPosition)
        // 移除地图上除定位点外的其他点
        vm.removeAMapMarker(vm.curMarkersArray)
        // 随机添加10个点标记
        vm.generateNearBy10Markers()
        // 移除圆
        vm.removeCircle()
        // 画圆
        const circleOpt = {
          map: vm.Amap,
          center: vm.currentPosition,
          radius: 7000,
          strokeColor: '#0ff',
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: '#f2f',
          fillOpacity: 0.7,
          strokeStyle: 'dashed'
        }
        vm.drawCircle(circleOpt)
      })
      // 随机添加10个点标记
      vm.generateNearBy10Markers()
      // 添加点聚合
      // vm.addAMapMarkerClusterer()
      // 添加旋转、倾斜、复位、缩放在内的地图控件
      vm.addAMapCtrl()
    },
    // 移除指定点标记
    removeAMapMarker(mk) {
      this.Amap.remove(mk)
    },
    // 添加点标记
    addAMapMarker(icon, position = this.currentPosition, draggable = false) {
      const marker = new AMap.Marker({
        position,
        map: this.Amap,
        animation: 'AMAP_ANIMATION_DROP',
        icon: icon,
        draggable
      })
      this.Amap.add(marker)
      return marker
    },
    // 随机生成当前位置旁边的10个点标记-->后期的ajax请求
    generateNearBy10Markers() {
      const vm = this
      for (let i = 0; i < 10; i++) {
        const icon = new AMap.Icon({
          size: new AMap.Size(20, 20),
          image: require('./images/blue.png'), //自定义icon
          imageSize: new AMap.Size(20, 20),
          imageOffset: new AMap.Pixel(0, 0)
        })
        const position = [
          vm.currentPosition[0] + (Math.random() - 0.5) * 0.08,
          vm.currentPosition[1] + (Math.random() - 0.5) * 0.08
        ]
        const marker = vm.addAMapMarker(icon, position)
        marker.dataId = i
        vm.curMarkersArray.push(marker)
        marker.on('click', function() {
          const { position } = this.B
          // console.log(this, position)
          this.contentInfo = `建行厦门科技支行${this.dataId}`
          const content = `<div style='cursor:pointer;' id=${this.dataId}>${this.contentInfo}</div>`
          const infoWindowOpts = {
            // isCustom: true, //使用自定义窗体
            content: content,
            offset: new AMap.Pixel(0, -24)
          }
          const infoWinRef = vm.addAMapInfoWindow(infoWindowOpts)
          infoWinRef.on('open', () => {
            // 需要等到 infoWinRef.open 方法执行后地图上已经存在该dom才可获取 否则获取不到报错 所以才需要异步操作
            setTimeout(() => {
              document.getElementById(this.dataId).addEventListener('click', () => {
                console.log('this.dataId', this.dataId, this)
              })
            }, 0)
          })
          infoWinRef.open(vm.Amap, position)
        })
      }
    },
    // 添加点聚合
    addAMapMarkerClusterer() {
      let markers = [],
        mk = null
      for (let i = 0; i < 2000; i += 1) {
        const icon = new AMap.Icon({
          size: new AMap.Size(20, 20),
          image: require('./images/blue.png'), //自定义icon
          imageSize: new AMap.Size(20, 20),
          imageOffset: new AMap.Pixel(0, 0)
        })
        const position = [
          this.currentPosition[0] + (Math.random() - 0.5) * 0.08,
          this.currentPosition[1] + (Math.random() - 0.5) * 0.08
        ]
        mk = this.addAMapMarker(icon, position)
        markers.push(mk)
      }
      // es6 module 规范引入
      import('./clustererStylesES6').then(clustererStylesES6 => {
        const styles = clustererStylesES6.default
        const cluster = new AMap.MarkerClusterer(this.Amap, markers, { gridSize: 80, styles })
      })
      // commonjs规范引入
      // const styles = require('./clustererStylesCommonJS')
      // const cluster = new AMap.MarkerClusterer(this.Amap, markers, { gridSize: 80, styles })
    },
    // 浏览器获取当前定位
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 20000, //超过10秒后停止定位，默认：5s
          buttonPosition: 'RB', //定位按钮的停靠位置
          markerOptions: {
            //自定义定位点样式，同Marker的Options
            offset: new AMap.Pixel(-18, -36),
            content:
              '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
          },
          buttonOffset: new AMap.Pixel(10, 10), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
        })
        this.Amap.addControl(geolocation)
        geolocation.getCurrentPosition(function(status, result) {
          if (status == 'complete') {
            console.log(result, 'success')
            resolve(result, 'success')
          } else {
            console.log(result, 'fail')
            reject(result, 'fail')
          }
        })
      })
    },
    // 返回地图中心点（当前定位点）
    backToMapCenter() {
      const vm = this
      vm.Amap.panTo(vm.currentPosition)
    },
    // 添加旋转、倾斜、复位、缩放在内的地图控件
    addAMapCtrl() {
      const CtrlBarOpt = {
        position: { top: '10px', right: '10px' }
      }
      const controlBar = new AMap.ControlBar(CtrlBarOpt)
      this.Amap.addControl(controlBar)
    },
    // 画圆
    drawCircle(circleOpt) {
      this.circle = new AMap.Circle(circleOpt)
    },
    // 移除圆
    removeCircle() {
      this.circle.setMap(null)
    },
    // 添加信息窗口
    addAMapInfoWindow(infoWindowOpts) {
      const infoWindow = new AMap.InfoWindow(infoWindowOpts)
      return infoWindow
    },
    // 移除信息窗口
    removeAMapInfoWindow() {
      this.Amap.clearInfoWindow()
    }
  }
}
</script>

<style lang="scss">
#AMap-container {
  position: relative;
  min-width: 750px;
  height: inherit;
  min-height: 600px;
  font-size: 14px;
}
.backCenter-AMap {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 40px;
  left: 40px;
  cursor: pointer;
  z-index: 9999;
  background-image: url('./images/BKC.png');
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
