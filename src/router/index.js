import Vue from "vue"
import VueRouter from "vue-router"
import routeArray from "./src"

Vue.use(VueRouter)
const routes = [
	{
		path: "/",
		redirect: "/login",
		hidden: true,
	},
	...routeArray,
	// 404 page must be placed at the end !!!
	{
		path: "*",
		redirect: "/404",
	},
]

export { routes }
export default new VueRouter({
	routes,
})
