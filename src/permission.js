import router from "./router"
import store from "./store"
import { getTokenSession, getPageTitle } from "@/utils/index"
// import { Message } from "element-ui";
import NProgress from "nprogress" // progress bar
import "nprogress/nprogress.css" // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
	// start progress bar
	NProgress.start()
	// set page title
	document.title = getPageTitle(to.meta.title)
	const token = getTokenSession()
	store.dispatch("app/activedMenuItem", to.name)
	if (token) {
		NProgress.done()

		if (to.name === "login") {
			next({ name: "home" })
		} else {
			next()
		}
	} else {
		NProgress.done()
		if (to.name !== "login") {
			next({ name: "login" })
		} else {
			next()
		}
	}
})

router.afterEach(() => {
	NProgress.done()
})
