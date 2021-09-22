import request from "@/axios"
export const mapProvinceDataApi = (params) => {
	return request({
		url: `tree/map/province/${params.label}/list`,
		method: "get",
		params,
	})
}
export const treeApi = (params) => {
	return request({
		url: "tree",
		method: "get",
		params,
	})
}
