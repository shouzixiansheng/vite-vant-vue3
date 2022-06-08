<template>
  <div class="wallHead flex_jb">
    <section class="flex_ac">
      <section class="flex_ac" @click="toHome">
        <img class="logo mr15" src="/images/common/logo.png" alt="" />
      </section>
      <div class="search flex_ac" @click="toSearchNft">
        <img src="/images/common/icon_sousuo.png" alt="" />
      </div>
    </section>
    <section class="wallBox flex_ac">
      <div class="assets mr15" @click="showAssetsfn">
        <img src="/images/common/heyue.png" alt="" />
      </div>
      <div class="collectWa" @click="openWall" v-if="!userAddress">
        {{ $t('common.connectWall') }}
      </div>
      <div v-else class="assets" @click="openMyfn">
        <img src="/images/common/my.png" alt="" />
      </div>
      <div class="collectWa collectWaLang" @click="changeLang">{{ lang }}</div>
    </section>
    <!-- 资产-->
    <assets-dialog v-model:show="showAssets" @close="showAssets = false"></assets-dialog>
  </div>
</template>

<script setup lang="ts">
import assetsDialog from './walletHead/assetsDialog.vue'
import { useStore } from '@/store/index'
import { getCurrentInstance } from 'vue'
import { Locale } from 'vant'
// 英文
import enUS from 'vant/lib/locale/lang/en-US'
// 中文简体
import zhCN from 'vant/lib/locale/lang/zh-CN'
let { proxy } = getCurrentInstance()

// proxy.$i18n.locale = localStorage.getItem('lang') || 'zh'
// Locale.use(proxy.$i18n.locale == 'zh' ? 'zh-CN' : 'en-US', proxy.$i18n.locale == 'zh' ? zhCN : enUS)
let lang = ref('CN')
lang.value = proxy.$i18n.locale == 'zh' ? 'CN' : 'EN'
const store = useStore()
const router = useRouter()

let address = ref('')
let showAssets = ref(false)

const toSearchNft = () => {
  console.log(router.push)
  router.push('/search_nft')
}
const openMyfn = () => {
  router.push('/my')
}
const showAssetsfn = () => {
  showAssets.value = true
}
const userAddress = computed(() => {
  return store.getters.userAddress
})
const toHome = () => {
  router.push('/home')
}
const openWall = () => {
  window.postTrack('login_wallet_btnclick')
  window.openWall()
}

const changeLang = () => {
  if (lang.value == 'CN') {
    Locale.use('en-US', enUS)
    localStorage.setItem('lang', 'en')
    proxy.$i18n.locale = 'en'
    lang.value = 'En'
  } else {
    Locale.use('zh-CN', zhCN)
    localStorage.setItem('lang', 'zh')
    proxy.$i18n.locale = 'zh'
    lang.value = 'CN'
  }
}
</script>

<style lang="less" scoped>
.wallHead {
  padding: 0 15px;
  height: 60px;
  background: #3773ba;
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
      width: 88px;
      height: 32px;
      line-height: 32px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #ffffff;
      text-align: center;
      font-weight: 500;
      border: 1px solid #ffffff;
      border-radius: 8px;
    }
    .collectWaLang {
      margin-left: 15px;
      width: 36px;
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
</style>
