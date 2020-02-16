import { Toast } from "vant";
// import axios from "axios";

export const fieldToast = (message, ref) => {
  Toast(message);
  ref.focus();
};

export function isWechat() {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.indexOf("micromessenger") !== -1;
}

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
