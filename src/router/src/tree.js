export default {
	path: "/tree",
	component: () => import("@/components/layout/index"),
	children: [
		{
			path: "index",
			name: "tree",
			component: () => import("@/views/tree/index"),
			meta: {
				role: ["admin", "guest"],
				title: "树",
				icon: "xl-icon-Treewithered",
			},
			hidden: true,
			level: 1,
			sort: 7,
		},
	],
}
