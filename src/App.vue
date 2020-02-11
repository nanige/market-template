<template>
  <div id="app">
    <button @click="isShow.task = true">打开任务</button>
    <button @click="isShow.inviteProcesson = true">打开邀请进度</button>
    <task :visible.sync="isShow.task"></task>
    <inviteProcesson
      :visible.sync="isShow.inviteProcesson"
      @close="isShow.inviteProcesson = false"
    ></inviteProcesson>
  </div>
</template>

<script>
import task from "./views/task";
import inviteProcesson from "./views/inviteProcesson";

export default {
  name: "App",
  components: {
    task,
    inviteProcesson
  },
  data() {
    return {
      isShow: {
        task: false,
        inviteProcesson: false
      }
    };
  },
  methods: {}
};
</script>

<style>
body,
html {
  height: 100%;
}
#app {
  background-image: url("./assets/bg.png");
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
