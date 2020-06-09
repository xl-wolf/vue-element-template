<template>
  <div class="app-main-container">
    <div id="threeVR-container"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import {
  RollerCoasterGeometry,
  RollerCoasterShadowGeometry,
  RollerCoasterLiftersGeometry,
  TreesGeometry,
  SkyGeometry
} from 'three/examples/jsm/misc/RollerCoaster.js'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'
import { mapGetters } from 'vuex'
export default {
  name: 'threeVR',
  computed: {
    ...mapGetters(['menuStatus'])
  },
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      train: null,
      prevTime: null,
      velocity: null,
      position: null,
      tangent: null,
      lookAt: null,
      progress: null,
      funfairs: [],
      curve: null,
      WIDTH: null,
      HEIGHT: null
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
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    const VRcontainer = document.getElementById('threeVR-container')
    this.WIDTH = VRcontainer.clientWidth
    this.HEIGHT = VRcontainer.clientHeight
    this.renderer.setSize(this.WIDTH, this.HEIGHT)
    this.renderer.xr.enabled = true
    this.renderer.xr.setReferenceSpaceType('local')
    VRcontainer.appendChild(this.renderer.domElement)
    // VRcontainer.appendChild(VRButton.createButton(this.renderer))

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xf0f0ff)

    let light = new THREE.HemisphereLight(0xfff0f0, 0x606066)
    light.position.set(1, 1, 1)
    this.scene.add(light)

    this.train = new THREE.Object3D()
    this.scene.add(this.train)

    this.camera = new THREE.PerspectiveCamera(50, this.WIDTH / this.HEIGHT, 0.1, 500)
    this.train.add(this.camera)

    // environment

    const geometry1 = new THREE.PlaneBufferGeometry(500, 500, 15, 15)
    geometry1.rotateX(-Math.PI / 2)

    const positions = geometry1.attributes.position.array
    const vertex = new THREE.Vector3()

    for (let i = 0; i < positions.length; i += 3) {
      vertex.fromArray(positions, i)

      vertex.x += Math.random() * 10 - 5
      vertex.z += Math.random() * 10 - 5

      const distance = vertex.distanceTo(this.scene.position) / 5 - 25
      vertex.y = Math.random() * Math.max(0, distance)

      vertex.toArray(positions, i)
    }

    geometry1.computeVertexNormals()

    const material1 = new THREE.MeshLambertMaterial({
      color: 0x407000
    })

    const mesh1 = new THREE.Mesh(geometry1, material1)
    this.scene.add(mesh1)

    const geometry2 = new TreesGeometry(mesh1)
    const material2 = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      vertexColors: true
    })
    const mesh2 = new THREE.Mesh(geometry2, material2)
    this.scene.add(mesh2)

    const geometry3 = new SkyGeometry()
    const material3 = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const mesh3 = new THREE.Mesh(geometry3, material3)
    this.scene.add(mesh3)

    const PI2 = Math.PI * 2

    this.curve = (function() {
      const vector = new THREE.Vector3()
      const vector2 = new THREE.Vector3()

      return {
        getPointAt: function(t) {
          t = t * PI2

          const x = Math.sin(t * 3) * Math.cos(t * 4) * 50
          const y = Math.sin(t * 10) * 2 + Math.cos(t * 17) * 2 + 5
          const z = Math.sin(t) * Math.sin(t * 4) * 50

          return vector.set(x, y, z).multiplyScalar(2)
        },

        getTangentAt: function(t) {
          const delta = 0.0001
          const t1 = Math.max(0, t - delta)
          const t2 = Math.min(1, t + delta)

          return vector2
            .copy(this.getPointAt(t2))
            .sub(this.getPointAt(t1))
            .normalize()
        }
      }
    })()

    const geometry4 = new RollerCoasterGeometry(this.curve, 1500)
    const material4 = new THREE.MeshPhongMaterial({
      vertexColors: true
    })
    const mesh4 = new THREE.Mesh(geometry4, material4)
    this.scene.add(mesh4)

    const geometry5 = new RollerCoasterLiftersGeometry(this.curve, 100)
    const material5 = new THREE.MeshPhongMaterial()
    const mesh5 = new THREE.Mesh(geometry5, material5)
    mesh5.position.y = 0.1
    this.scene.add(mesh5)

    const geometry6 = new RollerCoasterShadowGeometry(this.curve, 500)
    const material6 = new THREE.MeshBasicMaterial({
      color: 0x305000,
      depthWrite: false,
      transparent: true
    })
    const mesh6 = new THREE.Mesh(geometry6, material6)
    mesh6.position.y = 0.1
    this.scene.add(mesh6)

    this.funfairs = []

    const geometry7 = new THREE.CylinderBufferGeometry(10, 10, 5, 15)
    const material7 = new THREE.MeshLambertMaterial({
      color: 0xff8080
    })
    const mesh7 = new THREE.Mesh(geometry7, material7)
    mesh7.position.set(-80, 10, -70)
    mesh7.rotation.x = Math.PI / 2
    this.scene.add(mesh7)

    this.funfairs.push(mesh7)

    const geometry8 = new THREE.CylinderBufferGeometry(5, 6, 4, 10)
    const material8 = new THREE.MeshLambertMaterial({
      color: 0x8080ff
    })
    const mesh8 = new THREE.Mesh(geometry8, material8)
    mesh8.position.set(50, 2, 30)
    this.scene.add(mesh8)

    this.funfairs.push(mesh8)

    window.addEventListener('resize', this.onWindowResize, false)

    this.position = new THREE.Vector3()
    this.tangent = new THREE.Vector3()
    this.lookAt = new THREE.Vector3()

    this.velocity = 0
    this.progress = 0

    this.prevTime = performance.now()

    this.renderer.setAnimationLoop(this.render)
  },
  methods: {
    // onWindowResize是可以抽象出一个mixins文件的方法提供给3d目录下的所有组件使用
    onWindowResize() {
      const VRcontainer = document.getElementById('threeVR-container')
      // 加if判断防止事件监听在离开本页面后因获取不到VRcontainer而报错
      if (VRcontainer) {
        this.WIDTH = VRcontainer.clientWidth
        this.HEIGHT = VRcontainer.clientHeight
        this.camera.aspect = this.WIDTH / this.HEIGHT
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.WIDTH, this.HEIGHT)
      }
    },
    render() {
      const time = performance.now()
      const delta = time - this.prevTime

      for (let i = 0; i < this.funfairs.length; i++) {
        this.funfairs[i].rotation.y = time * 0.0004
      }

      this.progress += this.velocity
      this.progress = this.progress % 1

      this.position.copy(this.curve.getPointAt(this.progress))
      this.position.y += 0.3

      this.train.position.copy(this.position)

      this.tangent.copy(this.curve.getTangentAt(this.progress))

      this.velocity -= this.tangent.y * 0.0000001 * delta
      this.velocity = Math.max(0.00004, Math.min(0.0002, this.velocity))

      this.train.lookAt(this.lookAt.copy(this.position).sub(this.tangent))

      this.renderer.render(this.scene, this.camera)

      this.prevTime = time
    }
  }
}
</script>


<style lang="scss" scoped>
#threeVR-container {
  height: inherit;
}
</style>
