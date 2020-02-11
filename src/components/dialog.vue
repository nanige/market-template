<!--  -->
<template>
  <div class="popup" @touchmove.self.prevent>
    <section class="popup-content-box">
      <div class="title">{{ title }}</div>
      <div class="popup-content">
        <slot></slot>
      </div>

      <img src="../img/popup2.png" class="titlebgimg" alt />

      <img src="../img/sanzi.png" class="shanzi" />
      <img
        src="../img/close.png"
        alt
        class="close"
        @click="handlerClose"
        v-if="canClose"
      />
    </section>
  </div>
</template>

<script>
import {
  addBobyOverFlowHidden,
  removeBobyOverflowHidden
} from "../utils/index";
export default {
  name: "popup",
  components: {},
  data() {
    return {
      xx: 1
    };
  },
  props: {
    title: {
      default: "",
      type: String
    },
    // 是否能关闭
    canClose: {
      default: true,
      type: Boolean
    }
  },
  computed: {},
  watch: {},
  methods: {
    handlerClose: function() {
      this.$emit("close");
    }
  },
  created() {
    addBobyOverFlowHidden();
  },
  mounted() {},
  beforeDestroy() {
    removeBobyOverflowHidden();
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
.popup {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  left: 0;
  top: 0;
  z-index: 11;
  pointer-events: auto;

  .popup-content-box {
    pointer-events: auto;
    .popup-content {
      min-height: 400px;
      max-height: 800px;
      width: 100%;
      overflow: scroll;
    }
    .title {
      font-family: PingFang SC;
      font-weight: 800;
      color: rgba(255, 220, 105, 1);
      font-size: 32px;
      position: absolute;
      top: -65px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
    }
    pointer-events: auto;
    background-color: rgb(254, 234, 188);

    padding: 10px;
    box-sizing: border-box;
    margin: 0 auto;
    width: 600px;

    border-radius: 20px;
    border: 20px solid rgb(218, 77, 0);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // background-image: url("../img/popup2.png");

    .titlebgimg {
      position: absolute;
      width: 114%;
      top: -90px;
      left: -42px;
      pointer-events: none;
    }
    .shanzi {
      position: absolute;
      width: 100px;
      height: 100px;
      bottom: 0px;
      left: 1px;
      z-index: -1;
    }

    .close {
      width: 80px;
      height: 80px;
      position: absolute;
      bottom: -140px;
      left: 50%;
      margin-left: -40px;
    }
  }
}
</style>
