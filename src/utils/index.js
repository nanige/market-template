import { Toast } from "vant";
import axios from "axios";
import { baseUrl } from "../config";

export const fieldToast = (message, ref) => {
  Toast(message);
  ref.focus();
};

export function isWechat() {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.indexOf("micromessenger") !== -1;
}

// export function getQueryString(name) {
//   // var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//   // var regRewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
//   // var r = window.location.search.substr(1).match(reg);
//   // var q = window.location.pathname.substr(1).match(regRewrite);
//   // if (r != null) {
//   //   return unescape(r[2]);
//   // } else if (q != null) {
//   //   return unescape(q[2]);
//   // } else {
//   //   return null;
//   // }
//   const code = this.$route.params.name;
//   if (code) {
//     return code;
//   } else {
//     return null;
//   }
// }
// 判断url是否带有某参数
export function hasQuery(name) {
  let search = window.location.search;
  if (search.indexOf(name) !== -1) {
    return true;
  }
  return false;
}

// localStorage
export function setLocalStorage(key, value) {
  if (value !== undefined && value !== "") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getLocalStorage(key) {
  let value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

//删除url参数
export function deleteUrlParam(url, ref) {
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
      if (arr[i].split("=")[0] != ref) {
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
    if (arr[0] == ref) {
      return url.substr(0, url.indexOf("?"));
    } else {
      return url;
    }
  }
}

// 获取url参数
// function getUrlParam(name) {
//   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
//   var r = window.location.search.substr(1).match(reg); //匹配目标参数
//   if (r != null) return unescape(r[2]);
//   return null; //返回参数值
// }

function getUlrParam(key) {
  var href = window.location.href,
    query = {};
  href.replace(/([^?#*=&]+)=([^?#*=&]+)/g, (...arg) => {
    let [, keyName, value] = arg;
    query[keyName] = value;
  });
  return query[key];
}
// 微信分享，在onCreate中调用
export function share(
  options = {},
  onMenuShareTimelineTriggerCallback,
  onMenuShareAppMessageTriggerCallback
) {
  const { origin, pathname } = location;
  const sUrl = encodeURIComponent(`${origin}${pathname}`);
  axios
    .post(`${baseUrl}/api_index.php/weixin/index/shareConf`, `sUrl=${sUrl}`)
    .then(res => {
      const data = res.data;
      if (data.code === 200) {
        const shareInfo = data.shareInfo;
        shareInfo.imgUrl = shareInfo.imgurl;
        const { appId, timestamp, nonceStr, signature } = data.signPackage;
        const { title, desc, link, imgUrl } = Object.assign(
          {},
          shareInfo,
          options
        );

        const wx = window.wx;

        wx.config({
          debug: false,
          appId,
          timestamp,
          nonceStr,
          signature,
          jsApiList: [
            "checkJsApi",
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareQZone",
            "onMenuShareWeibo",
            "translateVoice"
          ]
        });

        wx.ready(() => {
          wx.onMenuShareTimeline({
            title,
            desc,
            link,
            imgUrl,
            trigger: function() {
              // console.log('试试');

              typeof onMenuShareTimelineTriggerCallback == "function"
                ? onMenuShareTimelineTriggerCallback()
                : "";
            },
            success: function() {}
          });
          wx.onMenuShareAppMessage({
            title,
            desc,
            link,
            imgUrl,
            trigger: function() {
              typeof onMenuShareAppMessageTriggerCallback == "function"
                ? onMenuShareAppMessageTriggerCallback()
                : "";
            },
            success: function() {}
          });
          wx.onMenuShareQQ({
            title,
            desc,
            link,
            imgUrl
          });
          wx.onMenuShareQZone({
            title,
            desc,
            link,
            imgUrl
          });
        });
      }
    });
}

// 分享link链接, userId必须川
export function shareLink(userId) {
  return (
    encodeURI(
      getBaseUrl2(window.location.hostname) +
        "/index/ad/ad_index/adId/12081?presentId=" +
        getUlrParam("presentId")
    ) +
    "&inviteUid=" +
    userId
  );
}

function getBaseUrl2(hostname) {
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
export function getScrollOffset() {
  /*
   * @Author: @Guojufeng
   * @Date: 2019-01-31 10:58:54
   * 获取页面滚动条的距离-兼容写法封装
   */
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  } else {
    return {
      x: document.body.scrollLeft || document.documentElement.scrollLeft,
      y: document.body.scrollTop || document.documentElement.scrollTop
    };
  }
}

let scrollT = "";

export function addBobyOverFlowHidden() {
  scrollT = getScrollOffset().y;
  document.getElementsByTagName("body")[0].classList.add("bodyOverHiddenNone");
}

export function removeBobyOverflowHidden() {
  document
    .getElementsByTagName("body")[0]
    .classList.remove("bodyOverHiddenNone");
  if (window.pageXOffset) {
    window.pageYOffset = scrollT;
  } else {
    document.body.scrollTop = scrollT;
    document.documentElement.scrollTop = scrollT;
  }
}
