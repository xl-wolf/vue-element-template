import axios from "axios";
import { Loading, Message } from "element-ui";
let loading = null;
const baseURL =
  process.env === "development"
    ? "http://localhost:6067"
    : "http://localhost:6067";
// const baseURL =
//   process.env === "development"
//     ? "http://172.20.10.9:6067"
//     : "http://172.20.10.9:6067";
// create an axios instance
const service = axios.create({
  baseURL: baseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    loading = Loading.service({
      lock: true, // 是否锁屏
      text: "拼命加载中...", // 加载动画的文字
      // spinner: 'el-icon-loading',             // 引入的loading图标
      background: "rgba(0, 0, 0, 0.3)", // 背景颜色
      body: true,
    });
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    loading.close();
    const { data } = response;
    return data;
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    loading.close();
    return Promise.reject(error);
  }
);

export default service;
