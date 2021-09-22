import echarts from "echarts/lib/echarts"

export default {
	title: {
		text: "柱状图动画延迟",
		y: 10,
		x: 10,
	},
	legend: {
		data: ["bar", "bar2"],
		top: 10,
	},
	tooltip: {},
	xAxis: {
		data: [], //结合具体数据填充
		splitLine: {
			show: false,
		},
	},
	yAxis: {},
	series: [
		{
			name: "bar",
			type: "bar",
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: "#83bff6" },
					{ offset: 0.5, color: "#188df0" },
					{ offset: 1, color: "#188df0" },
				]),
			},
			emphasis: {
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "#2378f7" },
						{ offset: 0.7, color: "#2378f7" },
						{ offset: 1, color: "#83bff6" },
					]),
				},
			},
			data: [], //结合具体数据填充
			animationDelay: function(idx) {
				return idx * 10
			},
		},
		{
			name: "bar2",
			type: "bar",
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: "#f683bf" },
					{ offset: 0.5, color: "#f0188d" },
					{ offset: 1, color: "#f0188d" },
				]),
			},
			emphasis: {
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "#f72378" },
						{ offset: 0.7, color: "#f72378" },
						{ offset: 1, color: "#f683bf" },
					]),
				},
			},
			data: [], //结合具体数据填充
			animationDelay: function(idx) {
				return idx * 10 + 100
			},
		},
	],
	animationEasing: "elasticOut",
	animationDelayUpdate: function(idx) {
		return idx * 5
	},
}
