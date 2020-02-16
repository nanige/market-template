<template>
  <div id="app">
    可以开始工作了
    <button @click="isShow.login = true">登录</button>
    <login
      :visible.sync="isShow.login"
      @close="loginClose"
      :openid="userData.openid"
    ></login>
  </div>
</template>

<script>
import { wxAuth } from "@/utils/weixin";
import login from "@/components/login.vue";
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
    wxAuth().then(res => {
      this.userData = res;
      console.log(res);
    });
  },
  methods: {
    loginClose() {}
  }
};
</script>

<style>
body,
html {
  height: 100%;
}
</style>
