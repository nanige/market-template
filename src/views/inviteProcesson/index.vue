<template>
  <div>
    <popup
      :visible="visible"
      :titleTextImg="titleTextImg"
      @close="close"
      @open="open"
    >
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
    </popup>
  </div>
</template>

<script>
import popup from "../../components/popup";
export default {
  components: {
    popup
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      titleTextImg: require("../../assets/invitetitle.png")
    };
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
    open() {
      //打开弹出层时触发，建议取代create,mounted, 在这里请求数据
      console.log("打开");
    }
  }
};
</script>

<style lang="scss" scoped>
.taskpopupTitle {
  width: 100%;
  height: 313px;
  position: absolute;
  top: -310px;
  left: 0;
}
.taskPopup {
  background-color: rgb(197, 73, 47);
  overflow-y: visible;
}
.tasktitle {
  width: 100%;
  height: 222px;
  position: absolute;
  top: -162px;
  left: 0;
}
.popupContent {
  overflow: scroll;
  height: 100%;
}
</style>
<style lang="scss"></style>
