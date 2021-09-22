<template>
	<div class="iconfont full-screen" :title="screenStatus ? '退出全屏' : '全屏'" :class="`xl-icon-full-screen${screenStatus ? '-cancel' : ''}`" @click="handleRequestFullScreen" />
</template>

<script>
import screenfullModule from "@/utils/screenfull.js"
import { mapGetters } from "vuex"
export default {
	name: "fullScreen",
	computed: {
		...mapGetters(["screenStatus"]),
	},
	data() {
		return {
			screenfullEnabled: false,
		}
	},
	mounted() {
		screenfullModule.on("change", this.change)
	},
	destroyed() {
		if (screenfullModule.isEnabled) {
			screenfullModule.off("change", this.change)
		}
	},
	methods: {
		change() {
			const full = !screenfullModule.isFullscreen ? 0 : 1
			this.$store.dispatch("app/fullScreen", full)
		},
		handleRequestFullScreen() {
			screenfullModule.toggle()
			const full = !screenfullModule.isFullscreen ? 0 : 1
			this.$store.dispatch("app/fullScreen", full)
		},
	},
}
</script>
<style lang="scss">
.full-screen {
	font-size: 20px;
	color: #fff;
	cursor: pointer;
}
</style>
