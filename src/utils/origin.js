/**
 * 域名相关文件
 * {private} getApiOrigin() 获取api相关域名函数
 * {export} getJumpOrigin() 转跳时相关域名函数
 * {export} const apiOrigin 用作axios全局baseURL的变量
 * {export} const jumpOrigin 用来转跳的基础origin变量
 */

/**
 * @param {}
 * @return {String} 返回的域名
 * @description 一般用于axios作为baseURL全局域名使用
 */
//
function getApiOrigin() {
  // 如果在开发环境
  if (process.env.NODE_ENV == "development") {
    return "https://dev.vipthink.cn";
  }
  let hostname = window.location.hostname;
  var authUrlcases = {
    localhost: "", //本地
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
 * @param {type} 环境区分
 * 1：www: 正常环境，
 * 2：shop 积分商城环境
 * @return {String} 返回的域名
 * @description 一般用于跳转到其他项目和 getBaseUrl 唯一的区别是跳转到其他项目时,域名需要问www
 */
export function getJumpOrigin(type = 'www') {
  // 参数校验
  const paramOps = ['www', 'shop'];
  if (!paramOps.includes(type)) {
    alert('可传入参数必须为1:www. 2:shop')
    return;
  }


  // 如果在开发环境
  if (process.env.NODE_ENV === "development") {
    return type == 'www' ? "https://dev.vipthink.cn" : 'https://dev-shop.vipthink.cn'
  }

  let hostname = window.location.hostname;

  // www域名合集
  const wwwHostNamecases = {
    "dev.vipthink.cn": "https://dev.vipthink.cn", // dev
    "test.vipthink.cn": "https://test.vipthink.cn", //uat 测试
    "uat.vipthink.cn": "https://uat.vipthink.cn", //uat 测试
    "pre.vipthink.cn": "https://pre.vipthink.cn", //预发布
    "www.vipthink.cn": "https://www.vipthink.cn", // 正式服
    "vippi.net.cn": "https://www.vipthink.cn" // 正式服
  };

  // 积分商城域名合集
  const shopHostNamecases = {
    "dev.vipthink.cn": "https://dev-shop.vipthink.cn", // dev
    "test.vipthink.cn": "https://uat-shop.vipthink.cn", //uat 测试
    "uat.vipthink.cn": "https://uat-shop.vipthink.cn", //uat 测试
    "pre.vipthink.cn": "https://pre-shop.vipthink.cn", //预发布
    "www.vipthink.cn": "https://shop.vipthink.cn", // 正式服
    "vippi.net.cn": "https://shop.vipthink.cn" // 正式服
  };

  let matchCases = type === 'www' ? wwwHostNamecases : shopHostNamecases

  try {
    return matchCases[hostname];
  } catch (error) {
    return "https://dev.vipthink.cn";
  }
}

export const apiOrigin = getApiOrigin();
export const jumpOrigin = getJumpOrigin();
