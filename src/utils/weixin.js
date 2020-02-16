/**
 * 存放微信相关函数文件
 * {export} wxShare() 微信分享
 * {export} wxAuth() 微信授权
 * {private} fetchUserInfo() 获取用户信息
 * {private} fetchCode() 获取code
 * {export} shareLink() 分享时，传入userId绑定转介绍关系
 */

import { getUrlQuery, clearUrlQuery } from "@/utils/url.js";
import axios from "@/api";
import { baseUrl, getJumpUrl } from "@/config";
import { Toast } from "vant";

/**
 * 微信分享
 * @param {Object} options 参数
 * @param {funtion} onMenuShareTimelineTriggerCallback 分享朋友圈回调
 * @param {funtion} onMenuShareAppMessageTriggerCallback 分享好友回调
 * @return {} 无
 * @document http://api.pthinking.cn/web/#/53?page_id=14938
 */

export function wxShare(
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
        });
      }
    });
}

/**
 * 微信授权
 * @return {Promise} 返回一个promise对象
 * @description 微信授权，直接调用即可，在then即返回授权信息
 * @document http://api.pithinking.cn/web/#/53?page_id=14944
 */
export function wxAuth() {
  const code = getUrlQuery("code");
  if (code) {
    // 不刷新页面的方式清除url上的code。
    clearUrlQuery("code");
    // code存在，直接获取用户微信信息
    return fetchUserInfo(code).then(res => {
      return Promise.resolve(res);
    });
  } else {
    // code不存在，需要先获取code
    fetchCode();
  }
}

// 获取code
function fetchCode() {
  const sUrl = location.href;
  axios
    .post("/interactive/home/getOauthUrlForCode", { sUrl: sUrl })
    .then(res => {
      if (res.code === 200) {
        location.href = res.data.oauthUrl;
      } else {
        Toast.fail(res.msg);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

// 获取微信用户信息
function fetchUserInfo(code) {
  return axios
    .post("/interactive/home/getUserInfo", { code: code })
    .then(res => {
      if (res.code === 200) {
        return Promise.resolve(res.data);

        // setLocalStorage("userData", res.data);
        // setLocalStorage("cookie", res.data.cookie);
        // localStorage.removeItem("userId");
        // localStorage.setItem("userId", res.data.klzzId);
      } else {
        // 假设获取code失败，清空code，刷新页面
        clearUrlQuery("code");
        window.location.reload();
      }
    })
    .catch(err => {
      console.log(err);
    });
}

// 分享link链接, userId必须传
export function shareLink(userId) {
  return (
    encodeURI(
      getJumpUrl() +
        "/index/ad/ad_index/adId/12081?presentId=" +
        getUrlQuery("presentId")
    ) +
    "&inviteUid=" +
    userId
  );
}
