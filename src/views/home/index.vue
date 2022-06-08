<template>
  <div class="home">
    <header class="flex_jb flex_ac">
      <span class="name">小说</span>
      <div class="login flex_ac">
        <img src="/images/head.png" alt="" />
        <span>请登录</span>
      </div>
    </header>
    <section class="tab">
      <van-tabs swipeable v-model:active="active" background="transparent" line-width="20" color="#F38F15">
        <van-tab v-for="index in 8" :title="'首页 ' + index">
          <ul class="list">
            <li class="flex">
              <div class="left">
                <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Fphoto%2Fl%2Fpublic%2Fp2179905929.jpg&refer=http%3A%2F%2Fimg1.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657267666&t=f48bc4429b2ba414fa50651649c56ac5" alt="" />
              </div>
              <div class="rgt">
                <div class="tit">天才重生</div>
                <div class="des">叶天生从小是孤儿，好不容易考上了事业单位的铁饭碗，却又屡受上司刁难，一次偶然机会，叶天生和新来的女县长结下缘分，迎来人生转机，走出了一条另类天生从小是孤儿，好不容易考上了事业单位的铁饭碗，却又屡受上司刁难，一次偶然机会，叶天生和新来的女县长结下缘</div>
              </div>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </section>
  </div>
</template>

<script setup lang="ts">
let activTab = ref(0)
</script>

<style lang="less" scoped>
.home :deep(.van-tab) {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #656565;
  letter-spacing: 0;
  font-weight: 400;
}
.home :deep(.van-tab--active) {
  font-family: PingFangSC-Regular;
  font-size: 18px;
  color: #333;
  letter-spacing: 0;
  font-weight: 600;
}

.home {
  header {
    padding: 0 20px;
    height: 57px;
    .login {
      padding: 0 8px;
      height: 28px;
      background-image: linear-gradient(90deg, #ffa51f 0%, #f38f15 100%);
      border-radius: 15px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 0;
      font-weight: 400;
      img {
        width: 20px;
        margin-left: 5px;
      }
    }
  }
  .tab {
    height: 48px;
    padding: 0 10px;
  }
  .list {
    background: #fff;
    padding: 15px;
    border-radius: 12px;
    li {
      .left {
        margin-right: 15px;
        img {
          width: 78px;
          height: 104px;
        }
      }
      .rgt {
        .tit {
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          font-weight: 500;
        }
        .des {
          margin-top: 10px;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #808082;
          line-height: 1.6;
          letter-spacing: 0;
          font-weight: 400;
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }
      }
    }
  }
}
</style>
