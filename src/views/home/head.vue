<template>
  <div class="wallHead flex_jb">
    <section class="flex_ac">
      <section class="flex_ac">
        <img class="logo mr15" src="/images/common/logo.png" alt="" />
      </section>
      <div class="search flex_ac" @click="toSearchNft">
        <img src="/images/common/icon_sousuo.png" alt="" />
      </div>
    </section>
    <section class="wallBox flex_ac">
      <div class="assets" @click="openPop">
        <img :src="showPop ? '/images/home/icon_syclose@3x.png' : '/images/home/icon_symore@3x.png'" alt="" />
      </div>
    </section>
    <van-popup v-model:show="showPop" :overlay="false" position="right" :style="{ height: '100%', width: '100%', marginTop: '55px', background: '#fafcfd' }">
      <section class="popCont">
        <ul>
          <li>关于</li>
          <li>关于我们</li>
          <li>开发人员</li>
          <li>GitHub</li>
        </ul>
        <ul>
          <li>帮助</li>
          <li>服务条款</li>
          <li>免责声明</li>
          <li>帮助文档</li>
          <li>伙伴关系</li>
        </ul>
      </section>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/index'
const store = useStore()
const router = useRouter()

let address = ref('')
let showAssets = ref(false)

const toSearchNft = () => {
  console.log(router.push)
  router.push('/search_nft')
}
let showPop = ref(false)
const openPop = () => {
  showPop.value = !showPop.value
}
</script>

<style lang="less" scoped>
.wallHead {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0 15px;
  height: 60px;
  background: #3773ba;
  z-index: 9;
  .logo {
    width: 30px;
    height: 30px;
  }
  .search {
    width: 40px;
    height: 100%;
    img {
      width: 24px;
      height: 24px;
    }
  }
  .wallBox {
    .collectWa {
      width: 100px;
      height: 36px;
      line-height: 36px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      font-weight: 500;
      border: 1px solid #ffffff;
      border-radius: 8px;
    }
    .assets {
      width: 24px;
      height: 24px;
      font-size: 0;
    }
    img {
      width: 24px;
      height: 24px;
    }
  }
}
.popCont {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #000000;
  font-weight: 400;
  ul li {
    margin-bottom: 20px;
    padding: 0 20px;
    &:first-child {
      height: 60px;
      line-height: 60px;
      background: #fff;
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #000000;
      font-weight: 600;
    }
  }
}
</style>
