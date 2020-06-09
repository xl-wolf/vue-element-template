<template>
  <div class="app-main-container">
    <div id="three02-container"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'
import { mapGetters } from 'vuex'

export default {
  name: 'three02',
  computed: {
    ...mapGetters(['menuStatus'])
  },
  data() {
    return {
      WIDTH: null,
      HEIGHT: null,
      VIEW_ANGLE: 45,
      NEAR: 1,
      FAR: 500,
      camera: null,
      scene: null,
      renderer: null,
      cameraControls: null,
      sphereGroup: null,
      smallSphere1: null,
      smallSphere2: null
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
    this.init()
    this.animate()
  },
  methods: {
    // onWindowResize是可以抽象出一个mixins文件的方法提供给3d目录下的所有组件使用
    onWindowResize() {
      const VRcontainer = document.getElementById('three02-container')
      // 加if判断防止事件监听在离开本页面后因获取不到VRcontainer而报错
      if (VRcontainer) {
        this.WIDTH = VRcontainer.clientWidth
        this.HEIGHT = VRcontainer.clientHeight
        this.camera.aspect = this.WIDTH / this.HEIGHT
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.WIDTH, this.HEIGHT)
      }
    },
    init() {
      const container = document.getElementById('three02-container')
      this.WIDTH = container.clientWidth
      this.HEIGHT = container.clientHeight
      // renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(this.WIDTH, this.HEIGHT)
      container.appendChild(this.renderer.domElement)
      // scene
      this.scene = new THREE.Scene()
      // camera
      this.camera = new THREE.PerspectiveCamera(
        this.VIEW_ANGLE,
        this.WIDTH / this.HEIGHT,
        this.NEAR,
        this.FAR
      )
      this.camera.position.set(0, 75, 160)

      this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement)
      this.cameraControls.target.set(0, 40, 0)
      this.cameraControls.maxDistance = 400
      this.cameraControls.minDistance = 10
      this.cameraControls.update()

      const planeGeo = new THREE.PlaneBufferGeometry(100.1, 100.1)
      // reflectors/mirrors
      const geometry1 = new THREE.CircleBufferGeometry(40, 64)
      const groundMirror = new Reflector(geometry1, {
        clipBias: 0.003,
        textureWidth: this.WIDTH * window.devicePixelRatio,
        textureHeight: this.HEIGHT * window.devicePixelRatio,
        color: 0x777777
      })
      groundMirror.position.y = 0.5
      groundMirror.rotateX(-Math.PI / 2)
      this.scene.add(groundMirror)

      const geometry2 = new THREE.PlaneBufferGeometry(100, 100)
      const verticalMirror = new Reflector(geometry2, {
        clipBias: 0.003,
        textureWidth: this.WIDTH * window.devicePixelRatio,
        textureHeight: this.HEIGHT * window.devicePixelRatio,
        color: 0x889999
      })
      verticalMirror.position.y = 50
      verticalMirror.position.z = -50
      this.scene.add(verticalMirror)

      this.sphereGroup = new THREE.Object3D()
      this.scene.add(this.sphereGroup)

      const geometry3 = new THREE.CylinderBufferGeometry(
        0.1,
        15 * Math.cos((Math.PI / 180) * 30),
        0.1,
        24,
        1
      )
      const material1 = new THREE.MeshPhongMaterial({ color: 0x00ffff, emissive: 0x444444 })
      const sphereCap = new THREE.Mesh(geometry3, material1)
      sphereCap.position.y = -15 * Math.sin((Math.PI / 180) * 30) - 0.05
      sphereCap.rotateX(-Math.PI)

      const geometry4 = new THREE.SphereBufferGeometry(
        15,
        24,
        24,
        Math.PI / 2,
        Math.PI * 2,
        0,
        (Math.PI / 180) * 120
      )
      const halfSphere = new THREE.Mesh(geometry4, material1)
      halfSphere.add(sphereCap)
      halfSphere.rotateX((-Math.PI / 180) * 135)
      halfSphere.rotateZ((-Math.PI / 180) * 20)
      halfSphere.position.y = 7.5 + 15 * Math.sin((Math.PI / 180) * 30)

      this.sphereGroup.add(halfSphere)

      // 跳动的球体
      const geometry5 = new THREE.IcosahedronBufferGeometry(5, 0)
      const material2 = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
        emissive: 0x333333,
        flatShading: true
      })
      this.smallSphere1 = new THREE.Mesh(geometry5, material2)
      this.scene.add(this.smallSphere1)
      this.smallSphere2 = new THREE.Mesh(geometry5, material2)
      this.scene.add(this.smallSphere2)

      // walls
      let planeTop = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0xff00ff }))
      planeTop.position.y = 100
      planeTop.rotateX(Math.PI / 2)
      this.scene.add(planeTop)

      const planeBottom = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0xffffff }))
      planeBottom.rotateX(-Math.PI / 2)
      this.scene.add(planeBottom)

      let planeFront = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0x7f7fff }))
      planeFront.position.z = 50
      planeFront.position.y = 50
      planeFront.rotateY(Math.PI)
      this.scene.add(planeFront)

      let planeRight = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0x00ff00 }))
      planeRight.position.x = 50
      planeRight.position.y = 50
      planeRight.rotateY(-Math.PI / 2)
      this.scene.add(planeRight)

      let planeLeft = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0x00ffff }))
      planeLeft.position.x = -50
      planeLeft.position.y = 50
      planeLeft.rotateY(Math.PI / 2)
      this.scene.add(planeLeft)

      // lights
      let mainLight = new THREE.PointLight(0xcccccc, 1.5, 250)
      mainLight.position.y = 60
      this.scene.add(mainLight)

      const greenLight = new THREE.PointLight(0x00ff00, 0.25, 1000)
      greenLight.position.set(550, 50, 0)
      this.scene.add(greenLight)

      let redLight = new THREE.PointLight(0xff0000, 0.25, 1000)
      redLight.position.set(-550, 50, 0)
      this.scene.add(redLight)

      let blueLight = new THREE.PointLight(0x7f7fff, 0.25, 1000)
      blueLight.position.set(0, 50, 550)
      this.scene.add(blueLight)
      window.addEventListener('resize', this.onWindowResize, false)
    },
    animate() {
      requestAnimationFrame(this.animate)
      const timer = Date.now() * 0.01
      this.sphereGroup.rotation.y -= 0.002
      this.smallSphere1.position.set(
        Math.cos(timer * 0.1) * 36,
        Math.abs(Math.cos(timer * 0.2)) * 20 + 5,
        Math.sin(timer * 0.1) * 36
      )
      this.smallSphere1.rotation.y = Math.PI / 2 - timer * 0.1
      this.smallSphere1.rotation.z = timer * 0.8

      this.smallSphere2.position.set(
        Math.cos(timer * 0.1) * 20,
        Math.abs(Math.cos(timer * 0.2)) * 20 + 5,
        Math.sin(timer * 0.1) * 20
      )
      this.smallSphere2.rotation.y = Math.PI / 2 - timer * 0.2
      this.smallSphere2.rotation.z = timer * 0.8

      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style lang="scss" scoped>
#three02-container {
  height: inherit;
}
</style>
