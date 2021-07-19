<template>
  <div class="app-main-container">
    <div id="three03-container"></div>
    <div id="three03-container-ctrl">
      <i
        style="cursor:pointer;font-size:24px"
        title="点击播放"
        :class="{'iconfont':true,'xl-icon-pause':paused,'xl-icon-start':!paused}"
        @click="toggle"
      ></i>
    </div>

    <div id="three03-container-menu">
      <button id="table">TABLE</button>
      <button id="sphere">SPHERE</button>
      <button id="helix">HELIX</button>
      <button id="grid">GRID</button>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import table from './elements.js'
import { mapGetters } from 'vuex'
import mixins from '../mixins'
export default {
  name: 'three03',
  mixins: [mixins],
  computed: {
    ...mapGetters(['menuStatus'])
  },
  data() {
    return {
      domArray: [],
      WIDTH: null,
      HEIGHT: null,
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      objects: [],
      targets: null,
      table: null,
      timer: null,
      button1: null,
      button2: null,
      button3: null,
      button4: null,
      idx: 0,
      paused: false,
      animationFrameRef: null
    }
  },
  watch: {
    menuStatus: {
      deep: false,
      immediate: false,
      handler: function (val, oldVal) {
        this.onWindowResize()
      }
    }
  },
  mounted() {
    this.table = table
    this.targets = { table: [], sphere: [], helix: [], grid: [] }
    this.init()
    this.animate()
    // this.swiperItem()
  },
  destroyed() {
    this.clearInterval()
  },
  methods: {
    clearInterval() {
      clearInterval(this.timer)
      this.timer = null
    },
    toggle() {
      this.paused = !this.paused
      if (!this.paused) {
        this.clearInterval()
      } else {
        this.swiperItem()
      }
    },
    swiperItem() {
      this.timer = setInterval(() => {
        if (this.idx < 3) {
          this.idx++
        } else {
          this.idx = 0
        }
        ;[this.button1, this.button2, this.button3, this.button4][this.idx].click()
      }, 10000)
    },
    init() {
      const container = document.getElementById('three03-container')
      this.WIDTH = container.clientWidth
      this.HEIGHT = container.clientHeight
      this.camera = new THREE.PerspectiveCamera(40, this.WIDTH / this.HEIGHT, 1, 10000)
      this.camera.position.z = 3000
      this.scene = new THREE.Scene()

      // table

      for (let i = 0; i < this.table.length; i += 5) {
        const element = document.createElement('div')
        element.className = 'element'
        element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')'

        const number = document.createElement('div')
        number.className = 'number'
        number.textContent = i / 5 + 1
        element.appendChild(number)

        const symbol = document.createElement('div')
        symbol.className = 'symbol'
        symbol.textContent = this.table[i]
        element.appendChild(symbol)

        const details = document.createElement('div')
        details.className = 'details'
        details.innerHTML = this.table[i + 1] + '<br>' + this.table[i + 2]
        element.appendChild(details)

        const object1 = new CSS3DObject(element)
        object1.position.x = Math.random() * 4000 - 2000
        object1.position.y = Math.random() * 4000 - 2000
        object1.position.z = Math.random() * 4000 - 2000
        this.scene.add(object1)

        this.objects.push(object1)

        //

        const object2 = new THREE.Object3D()
        object2.position.x = this.table[i + 3] * 140 - 1330
        object2.position.y = -(this.table[i + 4] * 180) + 990

        this.targets.table.push(object2)
      }

      // sphere

      const vector1 = new THREE.Vector3()

      for (let i = 0, l = this.objects.length; i < l; i++) {
        const phi = Math.acos(-1 + (2 * i) / l)
        const theta = Math.sqrt(l * Math.PI) * phi

        const object12 = new THREE.Object3D()

        object12.position.setFromSphericalCoords(800, phi, theta)

        vector1.copy(object12.position).multiplyScalar(2)

        object12.lookAt(vector1)

        this.targets.sphere.push(object12)
      }

      // helix

      const vector2 = new THREE.Vector3()

      for (let i = 0, l = this.objects.length; i < l; i++) {
        const theta = i * 0.175 + Math.PI
        const y = -(i * 8) + 450

        const object22 = new THREE.Object3D()

        object22.position.setFromCylindricalCoords(900, theta, y)

        vector2.x = object22.position.x * 2
        vector2.y = object22.position.y
        vector2.z = object22.position.z * 2

        object22.lookAt(vector2)

        this.targets.helix.push(object22)
      }

      // grid

      for (let i = 0; i < this.objects.length; i++) {
        const object3 = new THREE.Object3D()

        object3.position.x = (i % 5) * 400 - 800
        object3.position.y = -(Math.floor(i / 5) % 5) * 400 + 800
        object3.position.z = Math.floor(i / 25) * 1000 - 2000

        this.targets.grid.push(object3)
      }

      //

      this.renderer = new CSS3DRenderer()
      this.renderer.setSize(this.WIDTH, this.HEIGHT)

      container.appendChild(this.renderer.domElement)

      //

      this.controls = new TrackballControls(this.camera, this.renderer.domElement)
      this.controls.minDistance = 500
      this.controls.maxDistance = 6000
      this.controls.addEventListener('change', this.render)

      this.button1 = document.getElementById('table')
      // 默认为表格
      !this.domArray.some(domi => {
        return this.button1 === domi
      }) && this.domArray.push(this.button1)
      this.toggleActiveClass(this.button1)
      this.button1.addEventListener(
        'click',
        () => {
          this.idx = 0
          this.transform(this.targets.table, 2000)
          !this.domArray.some(domi => {
            return this.button1 === domi
          }) && this.domArray.push(this.button1)
          this.toggleActiveClass(this.button1)
        },
        false
      )

      this.button2 = document.getElementById('sphere')
      this.button2.addEventListener(
        'click',
        () => {
          this.idx = 1
          this.transform(this.targets.sphere, 2000)
          !this.domArray.some(domi => {
            return this.button2 === domi
          }) && this.domArray.push(this.button2)
          this.toggleActiveClass(this.button2)
        },
        false
      )

      this.button3 = document.getElementById('helix')
      this.button3.addEventListener(
        'click',
        () => {
          this.idx = 2
          this.transform(this.targets.helix, 2000)
          !this.domArray.some(domi => {
            return this.button3 === domi
          }) && this.domArray.push(this.button3)
          this.toggleActiveClass(this.button3)
        },
        false
      )

      this.button4 = document.getElementById('grid')
      this.button4.addEventListener(
        'click',
        () => {
          this.idx = 3
          this.transform(this.targets.grid, 2000)
          !this.domArray.some(domi => {
            return this.button4 === domi
          }) && this.domArray.push(this.button4)
          this.toggleActiveClass(this.button4)
        },
        false
      )

      this.transform(this.targets.table, 2000)

      window.addEventListener('resize', this.onWindowResize, false)
    },
    transform(targets, duration) {
      TWEEN.removeAll()

      for (let i = 0; i < this.objects.length; i++) {
        const object = this.objects[i]
        const target = targets[i]

        new TWEEN.Tween(object.position)
          .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()

        new TWEEN.Tween(object.rotation)
          .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()
      }

      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start()
    },
    // onWindowResize是可以抽象出一个mixins文件的方法提供给3d目录下的所有组件使用
    onWindowResize() {
      const container = document.getElementById('three03-container')
      this.WIDTH = container.clientWidth
      this.HEIGHT = container.clientHeight
      this.camera.aspect = this.WIDTH / this.HEIGHT
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.WIDTH, this.HEIGHT)
      this.render()
    },
    animate() {
      console.log('three03')

      this.animationFrameRef = requestAnimationFrame(this.animate)

      TWEEN.update()

      this.controls.update()
    },
    render() {
      this.renderer.render(this.scene, this.camera)
    },
    toggleActiveClass(dom) {
      this.domArray.forEach(domItem => {
        domItem.className = ''
      })
      dom.className = 'active'
    }
  },
  beforeDestroy() {
    this.releaseMemory(this.animationFrameRef)
  }
}
</script>

<style lang="scss">
#three03-container {
  height: inherit;
  background: #000;
}
#three03-container-ctrl {
  position: absolute;
  top: 40px;
  width: calc(100% - 40px);
  padding-right: 20px;
  text-align: right;
  color: #fff;
}

#three03-container-menu {
  position: absolute;
  bottom: 40px;
  width: calc(100% - 40px);
  text-align: center;
}

.element {
  width: 120px;
  height: 160px;
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
  border: 1px solid rgba(127, 255, 255, 0.25);
  font-family: Helvetica, sans-serif;
  text-align: center;
  line-height: normal;
  cursor: default;
  &:hover {
    box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.75);
    border: 1px solid rgba(127, 255, 255, 0.75);
  }
  &.number {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 12px;
    color: rgba(127, 255, 255, 0.75);
  }
  .symbol {
    position: absolute;
    top: 40px;
    left: 0px;
    right: 0px;
    font-size: 60px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.75);
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
  }
  .details {
    position: absolute;
    bottom: 15px;
    left: 0px;
    right: 0px;
    font-size: 12px;
    color: rgba(127, 255, 255, 0.75);
  }
}

button {
  color: rgba(127, 255, 255, 0.75);
  background: transparent;
  outline: 1px solid rgba(127, 255, 255, 0.75);
  border: 0px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 255, 255, 0.5);
  }
  &:active {
    color: #000000;
    background-color: rgba(0, 255, 255, 0.75);
  }
  &.active {
    color: #000000;
    background-color: rgba(0, 255, 255, 0.75);
  }
}
</style>
