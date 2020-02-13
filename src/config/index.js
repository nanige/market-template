/**
 * @param {}
 * @return {String} 返回的域名
 * @description 一般用于axios作为baseUrl使用
 */
//
function getBaseUrl() {
  let hostname = window.location.hostname;
  var authUrlcases = {
    localhost: "https://dev.vipthink.cn", //本地
    "127.0.0.1": "https://dev.vipthink.cn", //本地
    "dev.vipthink.cn": "https://dev.vipthink.cn", // dev
    "test.vipthink.cn": "https://test.vipthink.cn", //uat 测试
    "uat.vipthink.cn": "https://uat.vipthink.cn", //uat 测试
    "pre.vipthink.cn": "https://pre.vipthink.cn", //预发布
    "www.vipthink.cn": "https://www.vipthink.cn", // 正式服
    "vippi.net.cn": "https://vippi.net.cn" // 正式服
  };
  try {
    return authUrlcases[hostname];
  } catch (error) {
    return "https://dev.vipthink.cn";
  }
}

/**
 *
 * @param {}
 * @return {String} 返回的域名
 * @description 一般用于跳转到其他项目和 getBaseUrl 唯一的区别是跳转到其他项目时,域名需要问www
 */
export function getJumpUrl() {
  let hostname = window.location.hostname;
  var authUrlcases = {
    localhost: "https://dev.vipthink.cn", //本地
    "127.0.0.1": "https://dev.vipthink.cn", //本地
    "dev.vipthink.cn": "https://dev.vipthink.cn", // dev
    "test.vipthink.cn": "https://test.vipthink.cn", //uat 测试
    "uat.vipthink.cn": "https://uat.vipthink.cn", //uat 测试
    "pre.vipthink.cn": "https://pre.vipthink.cn", //预发布
    "www.vipthink.cn": "https://www.vipthink.cn", // 正式服
    "vippi.net.cn": "https://www.vipthink.cn" // 正式服
  };
  try {
    return authUrlcases[hostname];
  } catch (error) {
    return "https://dev.vipthink.cn";
  }
}
export const baseUrl = getBaseUrl();
