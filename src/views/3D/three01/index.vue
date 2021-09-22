<template>
	<div class="app-main-container">
		<div id="three01-container" />
	</div>
</template>

<script>
import * as Three from "three"
import { mapGetters } from "vuex"
import mixins from "../mixins"
export default {
	name: "three01",
	mixins: [mixins],
	computed: {
		...mapGetters(["menuStatus"]),
	},
	data() {
		return {
			camera: null,
			scene: null,
			renderer: null,
			mesh: null,
			WIDTH: null,
			HEIGHT: null,
			animationFrameRef: null,
		}
	},
	mounted() {
		this.init()
		this.animate()
		window.onresize = () => {
			this.onWindowResize()
		}
	},
	watch: {
		menuStatus: {
			deep: false,
			immediate: false,
			handler: function() {
				this.onWindowResize()
			},
		},
	},
	methods: {
		init() {
			const container = document.getElementById("three01-container")
			this.WIDTH = container.clientWidth
			this.HEIGHT = container.clientHeight
			this.camera = new Three.PerspectiveCamera(70, this.WIDTH / this.HEIGHT, 0.01, 10)
			this.camera.position.z = 0.6
			this.scene = new Three.Scene()
			const geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
			const material = new Three.MeshNormalMaterial()
			this.mesh = new Three.Mesh(geometry, material)
			this.scene.add(this.mesh)

			this.renderer = new Three.WebGLRenderer({ antialias: true })
			this.renderer.setSize(this.WIDTH, this.HEIGHT)
			container.appendChild(this.renderer.domElement)
		},
		animate() {
			console.log("three01")
			this.animationFrameRef = requestAnimationFrame(this.animate)
			this.mesh.rotation.x += 0.01
			this.mesh.rotation.y += 0.02
			this.renderer.render(this.scene, this.camera)
		},
		onWindowResize() {
			const VRcontainer = document.getElementById("three01-container")
			// 加if判断防止事件监听在离开本页面后因获取不到VRcontainer而报错
			// onWindowResize是可以抽象出一个mixins文件的方法提供给3d目录下的所有组件使用
			if (VRcontainer) {
				this.WIDTH = VRcontainer.clientWidth
				this.HEIGHT = VRcontainer.clientHeight
				this.renderer.setSize(this.WIDTH, this.HEIGHT)
			}
		},
	},
	beforeDestroy() {
		this.releaseMemory(this.animationFrameRef)
	},
}
</script>
<style lang="scss" scoped>
#three01-container {
	height: inherit;
}
</style>
