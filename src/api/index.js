import axios from "axios";
import Vue from "vue";
import { baseUrl } from "../config/index";
import { Toast } from "vant";

Vue.use(Toast);

const timeout = 60000;
// console.log(baseUrl);

// 创建一个axios实例
const request = axios.create({
  baseURL: baseUrl + "/api_index.php",
  timeout
});

request.defaults.headers.post["Content-Type"] =
  "application/json;charset=UTF-8";

request.interceptors.request.use(
  function(config) {
    // let rdSession = localStorage.getItem("rdSession");
    // config.headers.rdSession = rdSession;

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.log(error);
    // const response = error.response;

    // 返回接口返回的错误信息
    return Promise.reject(error);
  }
);

export default request;
