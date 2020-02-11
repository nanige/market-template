<!-- 排行榜页面 -->
<template>
  <div class="rankingList">
    <div class="rankingListBg">
      <template v-for="(item, i) in toplist">
        <div class="topItem" :class="['topItem-' + Number(i + 1)]" :key="i">
          <div class="topItem-avatar-box">
            <img class="topItem-avatar" :src="item.avatar" alt />
            <div class="topItem-ranKicon">{{ i + 1 }}</div>
          </div>
          <div class="topItem-name">{{ item.name }}</div>
          <div class="topItem-id">ID: {{ item.id }}</div>
          <section class="topItem-info">
            <div class="topItem-taskNum">已完成{{ item.number }}次任务</div>
            <time>{{ item.time }}</time>
          </section>
        </div>
      </template>
      <!-- 第一名 -->

      <!-- 第二名 -->
      <!-- <div class="topItem topItem-2">
        <div class="topItem-avatar-box">
          <img class="topItem-avatar" src="../../img/avatar.png" alt />
          <div class="topItem-ranKicon">2</div>
        </div>
        <div class="topItem-name">张晓</div>
        <div class="topItem-id">ID:1234456</div>
        <section class="topItem-info">
          <div class="topItem-taskNum">已完成18次任务</div>
          <time>2019-10-10 11:11</time>
        </section>
      </div>-->
      <!-- 第三名 -->
      <!-- <div class="topItem topItem-3">
        <div class="topItem-avatar-box">
          <img class="topItem-avatar" src="../../img/avatar.png" alt />
          <div class="topItem-ranKicon">3</div>
        </div>
        <div class="topItem-name">张晓</div>
        <div class="topItem-id">ID:1234456</div>
        <section class="topItem-info">
          <div class="topItem-taskNum">已完成18次任务</div>
          <time>2019-10-10 11:11</time>
        </section>
      </div>-->
      <!-- 排行榜卡片信息 -->
    </div>
    <div class="cardBox">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <template v-for="(item, i) in listData">
          <div class="cardItem" :key="i">
            <div class="serialNumber">{{ i + 4 }}</div>
            <div class="leftRight">
              <div class="cardLeft">
                <div class="avatar">
                  <img :src="item.avatar" alt />
                </div>
                <div class="nameAndId">
                  <div class="name">{{ item.name }}</div>
                  <div class="id">{{ item.id }}</div>
                </div>
              </div>
              <div class="cardRight">
                <div class="taskNum">已完成{{ item.number }}次任务</div>
                <div class="taskTime">{{ item.time }}</div>
              </div>
            </div>
          </div>
        </template>
      </van-list>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { List } from "vant";
import { Toast } from "vant";
Vue.use(List);

export default {
  name: "rankingList",
  data() {
    return {
      toplist: [],
      listData: [],
      loading: false,
      finished: false,
      formData: {
        page: 1,
        limit: 10
      }
    };
  },
  methods: {
    fetchList(formData = this.formData) {
      // console.log("执行没啊");
      this.$http
        .post("interactive/lantern_festival/getRank", formData)
        .then(res => {
          // console.log("阿达");
          // console.log(res);

          if (res.code === 200) {
            this.toplist = res.data.slice(0, 3);
            this.listData = res.data.slice(3);
            this.loading = false;
            this.formData.page++;
            if (this.listData.length + 3 == res.pages.total) {
              this.finished = true;
            }
          } else {
            this.loading = false;
            this.finished = true;
            Toast.fail(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    loadList(formData = this.formData) {
      // console.log("执行loading");
      this.$http
        .post("interactive/lantern_festival/getRank", formData)
        .then(res => {
          // console.log("阿达");
          // console.log(res);

          if (res.code === 200) {
            res.data.forEach(item => {
              this.listData.push(item);
            });
            this.loading = false;
            this.formData.page++;
            if (this.listData.length + 3 == res.pages.total) {
              this.finished = true;
            }
          } else {
            this.loading = false;
            this.finished = true;
            Toast.fail(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    onLoad() {
      this.loadList();
    }
  },
  created() {
    this.fetchList();
  }
};
</script>

<style lang="scss" scoped>
.rankingList {
  height: 100vh;

  .rankingListBg {
    padding-top: 0.1px;
    width: 100%;
    height: 560px;
    background-image: url("../../img/ranking_list_bg.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    // 顶部排行开始
    .topItem {
      display: flex;
      flex-direction: column;
      justify-items: center;
      width: 220px;
      padding-bottom: 20px;
      text-align: center;
      .topItem-avatar-box {
        position: relative;
        margin-bottom: 60px;
        .topItem-avatar {
          width: 108px;
          height: 108px;
          border-radius: 50%;
          box-sizing: border-box;
        }
        .topItem-ranKicon {
          width: 40px;
          height: 40px;
          line-height: 45px;
          position: absolute;
          left: 50%;
          margin-left: -20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(172, 16, 13, 1);
          margin-top: -25px;
        }
      }

      .topItem-name {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 30px;
      }
      .topItem-id {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #8e0b0c;
        line-height: 36px;
      }
      .topItem-info {
        margin-top: 80px;
        .topItem-taskNum {
          height: 23px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 23px;
        }
        time {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 30px;
          margin-top: 20px;
        }
      }
    }
    // // 顶部排行通用样式结束

    .topItem-1 {
      position: absolute;
      left: 50%;
      margin-left: -110px;
      margin-top: 60px;
      .topItem-taskNum {
        background: rgba(142, 11, 12, 1);
        border-radius: 17px;
        height: 36px !important;
        line-height: 36px !important;
      }
      .topItem-avatar-box {
        .topItem-ranKicon {
          background-color: rgb(255, 228, 63);
          border-radius: 50%;
        }
        .topItem-avatar {
          width: 118px;
          height: 118px;
          border: 4px solid rgb(255, 228, 63);
        }
      }
    }
    .topItem-2 {
      position: absolute;
      left: 20px;
      margin-top: 120px;
      .topItem-avatar-box {
        .topItem-ranKicon {
          background-color: rgb(225, 233, 236);
          border-radius: 50%;
        }
        .topItem-avatar {
          border: 4px solid rgb(225, 233, 236);
        }
      }
    }
    .topItem-3 {
      position: absolute;
      right: 20px;
      margin-top: 140px;
      .topItem-avatar-box {
        .topItem-ranKicon {
          background-color: rgb(255, 184, 156);
          border-radius: 50%;
        }
        .topItem-avatar {
          border: 4px solid rgb(255, 184, 156);
        }
      }
    }
  }

  // 下面的
  .cardBox {
    height: calc(100vh - 600px);
    width: 100%;
    padding-top: 20px;
    //   background-color: pink;
    overflow-x: hidden;
    overflow-y: scroll;

    .cardItem {
      margin: 0 auto;
      width: 686px;
      height: 148px;
      // background-color: blue;
      box-sizing: border-box;
      border-bottom: 2px solid rgba(241, 241, 241, 1);
      display: flex;
      align-items: center;

      .serialNumber {
        width: 100px;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        text-align: center;
      }

      .leftRight {
        display: flex;
        justify-content: space-between;
        width: 584px;

        .cardLeft {
          display: flex;

          .avatar {
            margin: 0 19px 0 16px;
            width: 90px;
            height: 90px;
            border-radius: 50%;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .nameAndId {
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .name {
              font-size: 30px;
              font-family: PingFang SC;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
            }

            .id {
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
            }
          }
        }

        .cardRight {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-end;

          .taskNum {
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }

          .taskTime {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
    }
  }
}
</style>
