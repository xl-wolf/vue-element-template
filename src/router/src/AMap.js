export default {
	path: "/AMap",
	component: () => import("@/components/layout/index"),
	children: [
		{
			path: "index",
			name: "AMap",
			component: () => import("@/views/AMap/index"),
			meta: {
				role: ["admin", "guest"],
				title: "高德地图",
				icon: "xl-icon-gaodeditu",
			},
			hidden: false,
			level: 1,
			sort: 2,
		},
	],
}
