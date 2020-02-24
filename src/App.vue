<template>
  <div id="app">
    可以开始工作了
    <button @click="isShow.login = true">登录</button>
    <login
      :visible.sync="isShow.login"
      @close="loginClose"
      :openid="userData.openid"
      @success="loginSuccess"
    ></login>
  </div>
</template>

<script>
import { wxAuth } from "@/utils/weixin";
import login from "@/components/login.vue";
import { jumpTo } from "@/utils/jump.js";

export default {
  name: "App",
  components: {
    login
  },
  data() {
    return {
      isShow: {
        login: false
      },
      userData: {}
    };
  },
  mounted() {
    console.log(jumpTo("address"));
    wxAuth().then(res => {
      this.userData = res;
      console.log(res);
      // wxShare({
      //   title: "分享啦啦title",
      //   desc: "分享描述desc",
      //   link: shareLink({ userId: 112131, type: "ad" }),
      //   imgUrl:
      //     "http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg"
      // }).then(res => {
      //   console.log(res);
      // });
    });
  },
  methods: {
    loginClose() {},
    loginSuccess(res) {
      console.log(res);
    }
  }
};
</script>

<style>
body,
html {
  height: 100%;
}
</style>
