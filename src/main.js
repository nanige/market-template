import Vue from "vue";
import App from "./App.vue";
import "reset-css";
import request from "@/api/index";

import VueLazyLoad from "vue-lazyload";

// 图片懒加载
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: "./assets/imgloaderror.png",
  loading: "./assets/imgloading.jpg",
  attempt: 1
});

Vue.prototype.$http = request;
// fundebug配置
import fundebugVue from "fundebug-vue";
import { InitFundebug } from "./utils/fundebug";
try {
  let initFundebug = new InitFundebug({
    apikey: "fundebug项目的apikey",
    path: "static/activity/event/这里填项目名称"
  });
  let fundebugConfig = initFundebug.getConfig();
  fundebugVue(fundebugConfig, Vue);
} catch (error) {
  console.log(new Error("main你没有配置fundebug的apikey"));
}

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");