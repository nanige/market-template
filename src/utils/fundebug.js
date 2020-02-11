import * as fundebug from "fundebug-javascript";

// 引入录屏插件
require("fundebug-revideo");
export class InitFundebug {
  constructor(config) {
    let hostname = window.location.hostname;
    this.path = this.fullpath(config.path);
    fundebug.init({
      apikey: config.apikey,
      domain: this.getConfigDomain(hostname),
      releasestage: this.getReleasestage(hostname)
    });
  }
  getConfig() {
    return fundebug;
  }

  fullpath(path) {
    return path.charAt(0) == "/" ? path : `/${path}`;
  }
  /**
   * 区分环境，区分线上报错和测试/开发环境报错
   * @param {window.location.hostname} hostname
   */
  //
  getReleasestage(hostname) {
    // 本地开发，dev和uat环境请求的都是 https://uat-auth.vipthink.cn/
    var authUrlcases = {
      localhost: "development", //本地
      "127.0.0.1": "development", //本地
      "dev.vipthink.cn": "development", // dev
      "test.vipthink.cn": "test", //uat 测试
      "uat.vipthink.cn": "test", //uat 测试
      "pre.vipthink.cn": "test", //预发布
      "www.vipthink.cn": "production" // 正式服
    };
    try {
      return authUrlcases[hostname];
    } catch (error) {
      return "production";
    }
  }

  /**
   * 获取fundebug录屏需要的domain配置
   * @param {window.location.hostname} hostname
   */
  //
  getConfigDomain(hostname) {
    //假如你的访问链接是https://uat.vipthink.cn/static/activity/longpage/one/index.html,
    //domain就是 index.html前面那一串
    var authUrlcases = {
      localhost: "https://dev.vipthink.cn" + this.path, //本地
      "127.0.0.1": "https://dev.vipthink.cn" + this.path, //本地
      "dev.vipthink.cn": "https://dev.vipthink.cn" + this.path, // dev
      "test.vipthink.cn": "https://test.vipthink.cn" + this.path, //uat 测试
      "uat.vipthink.cn": "https://uat.vipthink.cn" + this.path, //uat 测试
      "pre.vipthink.cn": "https://pre.vipthink.cn" + this.path, //预发布
      "www.vipthink.cn": "https://www.vipthink.cn" + this.path, // 正式服
      "https://vippi.net.cn": "https://vippi.net.cn" + this.path
    };
    try {
      return authUrlcases[hostname];
    } catch (error) {
      return "https://vippi.net.cn" + this.path;
    }
  }
}

// fundebug.apikey =
//   "1c74cde68b47bbadd84ad08b658a37f1ca1497ff059ed7ad807bb1ccf040c65a";

// let fundebug = require("fundebug-javascript");
