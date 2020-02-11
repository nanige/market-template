<template>
  <div>
    <vanPopup
      v-model="Visible"
      closeable
      position="bottom"
      :style="{ height: '70%' }"
      class="taskPopup"
      close-icon="close"
      @close="close"
      @open="open"
    >
      <img src="../assets/popupTitle.png" alt="" class="popupTitle" />
      <img :src="titleTextImg" alt="" class="titleTextImg" />
      <section class="popupContent">
        <slot></slot>
      </section>
    </vanPopup>
  </div>
</template>

<script>
import { Popup } from "vant";
export default {
  components: {
    vanPopup: Popup
  },
  props: {
    titleTextImg: {
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      Visible: this.visible
    };
  },
  methods: {
    close: function() {
      this.$emit("close");
    },
    open: function() {
      this.$emit("open");
    }
  },
  watch: {
    visible: function(val) {
      this.Visible = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.popupTitle {
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
.titleTextImg {
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
