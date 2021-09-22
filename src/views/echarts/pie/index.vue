<template>
	<div class="app-main-container">
		<div id="echarts-pieChart--container" />
	</div>
</template>

<script>
// 引入基本模板
import Echarts from "echarts/lib/echarts"
// 引入柱状图组件
import "echarts/lib/chart/pie"
// 引入提示框和title组件，图例等组件
import "echarts/lib/component/tooltip"
import "echarts/lib/component/dataZoom"
import "echarts/lib/component/title"
import "echarts/lib/component/legend"
import "echarts/lib/component/legendScroll" //图例翻译滚动
// 引入柱状图基本配置文件
import chartOpts from "./chartOpts"
// 引入echarts主题配置文件
import { theme_01, theme_02 } from "./themes"
import { mapGetters } from "vuex"
import mixins from "../mixins"

export default {
	name: "pieChart",
	mixins: [mixins],
	data() {
		return {
			pieEchartsRef: null,
		}
	},
	computed: {
		...mapGetters(["menuStatus"]),
	},
	watch: {
		menuStatus: {
			deep: false,
			immediate: false,
			handler: function(val, oldVal) {
				this.onWindowResize(this.pieEchartsRef)
			},
		},
	},
	created() {
		// 注册主题
		this.registerTheme()
	},
	mounted() {
		this.initPieEchart()
	},
	methods: {
		// 注册主题
		registerTheme() {
			Echarts.registerTheme("theme_01", theme_01)
			Echarts.registerTheme("theme_02", theme_02)
		},

		initPieEchart() {
			// 获取echarts容器与其引用
			const pieEchartsContainer = document.getElementById("echarts-pieChart--container")
			this.pieEchartsRef = Echarts.init(pieEchartsContainer, "theme_02")
			this.generateChartData().then((res) => {
				console.log(res)
				const chartOpts = res
				// // 使用指定的配置项和数据显示图表
				this.pieEchartsRef.setOption(chartOpts)
			})
			window.onresize = this.onWindowResize.bind(null, this.pieEchartsRef)
		},
		// 生成随机数据-->后期的ajax请求
		generateChartData() {
			return new Promise((resolve, reject) => {
				resolve(chartOpts)
			})
		},
	},
}
</script>

<style lang="scss" scoped>
#echarts-pieChart--container {
	height: inherit;
}
</style>
