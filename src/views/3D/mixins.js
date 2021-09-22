export default {
	methods: {
		releaseMemory(animationFrameRef) {
			cancelAnimationFrame(animationFrameRef)
			this.animationFrameRef = null
		},
	},
}
