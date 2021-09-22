export default {
	path: "/BMap",
	component: () => import("@/components/layout/index"),
	children: [
		{
			path: "index",
			name: "BMap",
			component: () => import("@/views/BMap/index"),
			meta: {
				role: ["admin", "guest"],
				title: "百度地图",
				icon: "xl-icon-751bianjiqi_baiduditu",
			},
			hidden: false,
			level: 1,
			sort: 3,
		},
	],
}
