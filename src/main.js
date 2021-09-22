import Vue from "vue"
import "normalize.css/normalize.css" // 一个现代的css样式重置库
import ElementUI from "element-ui"
// import "element-ui/lib/theme-chalk/index.css"; //在theme.scss中引入的@import "~element-ui/packages/theme-chalk/src/index";已经覆盖这边的样式，无需重复引入
import "@/styles/index.scss"
import "@/assets/xl-icon/iconfont.css" //载入自定义图标字体

import App from "./App.vue"
import router from "./router"
import store from "./store"
import { size } from "./settings"
import "./permission"
// 路由守卫，每次路由跳转之前获取项目token，根据token条件执行代码

Vue.use(ElementUI, { size })

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app")
