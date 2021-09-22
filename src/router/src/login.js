export default {
	path: "/login",
	name: "login",
	component: () => import("@/views/login/index"),
	meta: {
		role: ["admin", "guest"],
		title: "登录页",
	},
	hidden: true,
}
