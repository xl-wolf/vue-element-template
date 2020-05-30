import request from "@/axios";
export const amapPointsApi = (params) => {
  return request({
    url: "amap/points",
    method: "get",
    params,
  });
};
export const bmapPointsApi = (params) => {
  return request({
    url: "bmap/points",
    method: "get",
    params,
  });
};
