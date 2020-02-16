/**
 * 操作url相关函数文件
 *
 */

/**
 *
 * @param {String} url 要删除的href, 一般为当前域名 window.location.href
 * @param {String} key 要删除的key
 * @return {String} 返回删除指定key后的href, 不会改变当前url
 * @example deleteUrlQuery(window.location.href, 'code')
 *          //https://baidu.com?code=1234 => https://baidu.com
 * @document http://api.pithinking.cn/web/#/53?page_id=14945
 */
export function deleteUrlQuery(url, key) {
  var str = "";
  if (url.indexOf("?") != -1) {
    str = url.substr(url.indexOf("?") + 1);
  } else {
    return url;
  }
  var arr = "";
  var returnurl = "";
  // var setparam = "";
  if (str.indexOf("&") != -1) {
    arr = str.split("&");
    for (var i in arr) {
      if (arr[i].split("=")[0] != key) {
        returnurl =
          returnurl + arr[i].split("=")[0] + "=" + arr[i].split("=")[1] + "&";
      }
    }
    return (
      url.substr(0, url.indexOf("?")) +
      "?" +
      returnurl.substr(0, returnurl.length - 1)
    );
  } else {
    arr = str.split("=");
    if (arr[0] == key) {
      return url.substr(0, url.indexOf("?"));
    } else {
      return url;
    }
  }
}

/**
 *
 * @param {String} key 要查询url上的query对应的key值
 * @return {String} value值
 * @description 用于获取url上指定的query值，
 * @example 例如www.baidu,com?code=1&name=2。 调用方式为 getUrlQuery('code') // 1
 */
export function getUrlQuery(key) {
  var href = window.location.href,
    query = {};
  href.replace(/([^?#*=&]+)=([^?#*=&]+)/g, (...arg) => {
    let [, keyName, value] = arg;
    query[keyName] = value;
  });
  return query[key];
}

/**
 *
 * @param {String} key 要删除的key值
 * @return {}无
 * @description 和 deleteUrlQuery 不同，会直接清除url上的Query值,并且改变Query值不会刷新页面,一般用来清除url上无用的微信授权code
 */
export function clearUrlQuery(key) {
  if (window.history) {
    window.history.replaceState(
      "null",
      "",
      deleteUrlQuery(window.location.href, key)
    );
  }
}
