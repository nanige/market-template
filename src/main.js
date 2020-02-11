import Vue from "vue";
import App from "./App.vue";
import "reset-css";
import request from "@/api/index";

Vue.prototype.$http = request;

// fundebug配置
import fundebugVue from "fundebug-vue";
import { InitFundebug } from "./utils/fundebug";
let initFundebug = new InitFundebug({
  apikey: "7d17db8f016e1de60993d0396e83a3f8ad8326d5ef774c59546a644f2de73997",
  path: "static/activity/event/collectcard"
});
let fundebugConfig = initFundebug.getConfig();
fundebugVue(fundebugConfig, Vue);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
