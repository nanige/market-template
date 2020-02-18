<template>
  <div>
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '100%' }"
      @close="close"
      :closeable="canClose"
    >
      <div class="loginBox">
        <img src="../assets/logo.png" alt class="logo" />

        <div class="loginInputBox">
          <van-field
            v-model="formData.mobile"
            type="digit"
            placeholder="请输入手机号码"
            class="inputItem"
            size="mini"
            clearable
          >
            <!-- <van-button slot="button" size="small" type="primary"
              >区号
            </van-button>-->
          </van-field>
          <!-- </div> -->

          <van-field
            v-model="formData.smsCode"
            placeholder="请输入验证码"
            class="inputItem"
            size="mini"
            v-if="this.formData.type == 1"
          >
            <van-button
              slot="button"
              size="small"
              round
              color="#00D0CE"
              plain
              type="default"
              @click="fetchsms"
              v-if="!isDisabledSms"
            >获取验证码</van-button>
            <van-button
              slot="button"
              size="mini"
              type="default"
              @click="fetchsms"
              disabled
              v-else
            >{{ second }}秒后重新发送</van-button>
          </van-field>
          <van-field
            v-model="formData.password"
            placeholder="请输入密码"
            class="inputItem"
            size="mini"
            type="password"
            v-if="this.formData.type == 2"
          ></van-field>

          <div class="loginSwitch" @click="loginSwitch">
            <span v-if="this.formData.type == 1">切换密码登录</span>
            <span v-if="this.formData.type == 2">切换验证码登录</span>
          </div>
          <div class="btn" @click="handlerLogin">登录</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Field, Button, Toast, Popup } from "vant";
import { getUrlQuery } from "@/utils/url.js";

export default {
  name: "login",

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    openid: {
      type: String
    },
    // 是否能关闭
    canClose: {
      default: true,
      type: Boolean
    },

    // 用以区分渠道来源的presentId
    presentId: {
      default: getUrlQuery("presentId"),
      type: Number
    },

    // 绑定转介绍关系ID
    inviteUid: {
      default: getUrlQuery("inviteUid"),
      type: Number
    }
  },
  data() {
    return {
      formData: {
        type: 1, //登录方式 1：短信验证码登录 2：密码登录
        mobile: "",
        password: "",
        smsCode: "", //验证码
        areaCode: "",
        presentId: this.presentId,
        openid: this.openid
      },
      second: 10,
      loading: {
        sms: false
      },
      countryCode: "",
      isDisabledSms: false,
      show: false
    };
  },
  components: {
    vanPopup: Popup,
    vanField: Field,
    vanButton: Button
  },
  watch: {
    visible: function(val) {
      this.show = val;
    }
  },
  methods: {
    close: function() {
      this.$emit("update:visible", false);
      this.$emit("close");
    },
    //切换密码
    loginSwitch: function() {
      this.formData.type = this.formData.type == 1 ? 2 : 1;
    },
    // 获取验证码
    fetchsms: function() {
      // console.log(this.formData.mobile);

      if (!this.formData.mobile || this.formData.mobile.length !== 11) {
        Toast("请输入正确手机号码");
        return;
      }
      Toast.loading({
        message: "请求中...",
        forbidClick: true,
        duration: 0
      });
      this.$http
        .post("index/sms/sends", {
          mobile: this.formData.mobile
        })
        .then(res => {
          Toast.clear();
          if (res.code == 200) {
            Toast("已发送");
          } else if (res.code == 201) {
            Toast(res.msg);
          }
          // console.log(res);
        });
    },
    handlerLogin: function() {
      if (!this.formData.mobile || this.formData.mobile.length !== 11) {
        Toast("请输入正确手机号码");
        return;
      }

      Toast.loading({
        message: "请求中...",
        forbidClick: true,
        duration: 0
      });
      this.$http
        .post("weixin/account/wxMobileBinding", {
          mobile: this.formData.mobile,
          type: this.formData.type,
          smsCode: this.formData.smsCode,
          password: this.formData.password,
          openid: this.openid,
          inviteUid: this.inviteUid
        })
        .then(res => {
          // console.log(res);

          if (res.code == 200) {
            Toast.clear();
            Toast("登录成功");
            this.$emit("success", res);
          } else if (res.code == 201) {
            Toast(res.msg);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.loginBox {
  width: 100%;
  height: 100%;
  background-color: rgb(247, 248, 250);
  position: absolute;
  top: 0;
  left: 0;
  .logo {
    width: 345px;
    height: 81px;
    margin: 96px auto;
    display: block;
  }
  .loginInputBox {
    padding: 0 20px;
    .btn {
      width: 617px;
      height: 90px;
      background: rgba(0, 208, 206, 1);
      border-radius: 45px;
      text-align: center;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(255, 254, 254, 1);
      line-height: 90px;
      margin: 50px auto;
    }
    .countryCode {
      width: 50px;
      height: 24px;
    }
    .inputItem {
      border-radius: 100px;
      margin: 20px 0;
    }
    .loginSwitch {
      font-family: PingFang SC;
      font-weight: 500;
      text-decoration: underline;
      color: #666666;
      text-align: left;
      margin: 20px 10px;
    }
  }
}
</style>
