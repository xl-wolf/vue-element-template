import request from "@/axios"
export const loginApi = (params) => {
	return request({
		url: "user/login",
		method: "post",
		params,
	})
}
export const logoutApi = (params) => {
	return request({
		url: "user/logout",
		method: "post",
		params,
	})
}
