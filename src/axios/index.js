import axios from "axios"
import { primaryColor } from '@/styles/variables.scss'
import {
	Message,
} from "element-ui"
import { mountLoading, destroyLoading,showLoading,hideLoading } from "@/assets/js/MagicLoading.js"
const baseURL = process.env === "development" ? "http://localhost:6067" : "http://localhost:6067"
// const baseURL =
//   process.env === "development"
//     ? "http://172.20.10.9:6067"
//     : "http://172.20.10.9:6067";
// create an axios instance
const service = axios.create({
	baseURL: baseURL, // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 20000, // request timeout
})
const loadingContainer = document.body
// request interceptor
service.interceptors.request.use(
	(config) => {
		// mountLoading(loadingContainer,[primaryColor,primaryColor,primaryColor,primaryColor])
		showLoading(loadingContainer,[primaryColor,primaryColor,primaryColor,primaryColor])
		return config
	},
	(error) => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	(response) => {
		// destroyLoading(loadingContainer)
		hideLoading(loadingContainer)
		const { data } = response
		return data
	},
	(error) => {
		console.log("err" + error) // for debug
		Message({
			message: error.message,
			type: "error",
			duration: 5 * 1000,
		})
    // destroyLoading(loadingContainer)
    hideLoading(loadingContainer)
		return Promise.reject(error)
	}
)

export default service
