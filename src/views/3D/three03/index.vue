<template>
  <div class="app-main-container">
    <div id="three03-container"></div>
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
export default {
  name: 'three03',
  computed: {
    ...mapGetters(['menuStatus'])
  },
  data() {
    return {
      WIDTH: null,
      HEIGHT: null,
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      objects: [],
      targets: null,
      table: null
    }
  },
  watch: {
    menuStatus: {
      deep: false,
      immediate: false,
      handler: function(val, oldVal) {
        this.onWindowResize()
      }
    }
  },
  mounted() {
    this.table = table
    this.targets = { table: [], sphere: [], helix: [], grid: [] }
    this.init()
    this.animate()
  },
  methods: {
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

      const button1 = document.getElementById('table')
      button1.addEventListener(
        'click',
        () => {
          this.transform(this.targets.table, 2000)
        },
        false
      )

      const button2 = document.getElementById('sphere')
      button2.addEventListener(
        'click',
        () => {
          this.transform(this.targets.sphere, 2000)
        },
        false
      )

      const button3 = document.getElementById('helix')
      button3.addEventListener(
        'click',
        () => {
          this.transform(this.targets.helix, 2000)
        },
        false
      )

      let button4 = document.getElementById('grid')
      button4.addEventListener(
        'click',
        () => {
          this.transform(this.targets.grid, 2000)
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
          .to(
            { x: target.position.x, y: target.position.y, z: target.position.z },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()

        new TWEEN.Tween(object.rotation)
          .to(
            { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()
      }

      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start()
    },
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
      requestAnimationFrame(this.animate)

      TWEEN.update()

      this.controls.update()
    },
    render() {
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style lang="scss">
#three03-container {
  height: inherit;
  background: #000;
}

#three03-container-menu {
  position: absolute;
  bottom: 40px;
  width: 100%;
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
}
</style>
