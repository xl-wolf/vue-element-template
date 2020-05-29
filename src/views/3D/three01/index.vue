<template>
  <div class="app-main-container">
    <div id="three01-container"></div>
  </div>
</template>

<script>
import * as Three from 'three'
export default {
  name: 'three01',
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      WIDTH: null,
      HEIGHT: null
    }
  },
  mounted() {
    this.init()
    this.animate()
    window.onresize = () => {
      this.onWindowResize()
    }
  },
  methods: {
    init() {
      const container = document.getElementById('three01-container')
      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      )
      this.camera.position.z = 0.6
      this.scene = new Three.Scene()
      const geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
      const material = new Three.MeshNormalMaterial()
      this.mesh = new Three.Mesh(geometry, material)
      this.scene.add(this.mesh)

      this.renderer = new Three.WebGLRenderer({ antialias: true })
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement)
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.02
      this.renderer.render(this.scene, this.camera)
    },
    onWindowResize() {
      const VRcontainer = document.getElementById('three01-container')
      // 加if判断防止事件监听在离开本页面后因获取不到VRcontainer而报错
      if (VRcontainer) {
        this.WIDTH = VRcontainer.clientWidth
        this.HEIGHT = VRcontainer.clientHeight
        this.renderer.setSize(this.WIDTH, this.HEIGHT)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#three01-container {
  height: inherit;
}
</style>