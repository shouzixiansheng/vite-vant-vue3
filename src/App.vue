<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <!-- <transition :name="route.meta.transition || 'fade'" mode="out-in"> -->
      <keep-alive>
        <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" v-if="route.meta.keepAlive && showView"></component>
      </keep-alive>
      <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" v-if="!route.meta.keepAlive && showView"></component>
      <!-- </transition> -->
    </router-view>
    <!-- <tabbarBom v-if="route.name == 'market' || route.name == 'order' || route.name == 'money'" /> -->
    <!-- 钱包 -->
    <wall-dialog v-model:show="showWall" @close="showWall = false"></wall-dialog>
  </div>
</template>
<script setup lang="ts">
// import tabbarBom from '@/components/tabbarBom/index.vue'
import { useStore } from '@/store/index'
import wallDialog from '@/components/global/walletHead/wallDialog.vue'
import { startApp } from '@/utils/initChain'
const store = useStore()
import FingerprintJS from '@fingerprintjs/fingerprintjs'

import { Locale } from 'vant'
let { proxy } = getCurrentInstance()
// 英文
import enUS from 'vant/lib/locale/lang/en-US'
// 中文简体
import zhCN from 'vant/lib/locale/lang/zh-CN'
proxy.$i18n.locale = localStorage.getItem('lang') || 'zh'

const EmployeeWindow = window as any
EmployeeWindow.openWall = () => {
  showWall.value = true
}

const fpPromise = FingerprintJS.load()
fpPromise
  .then(fp => fp.get())
  .then(result => {
    // This is the visitor identifier:
    const uuId = result.visitorId
    // store.dispatch('SET_UUID', uuId)
    EmployeeWindow.postTrack = async event => {
      postTrack({ event: event.toUpperCase(), deviceId: uuId })
    }
  })

let routeName = ref(false)
const route = useRoute()
let showWall = ref(false)
let showView = ref(false)

onBeforeMount(async () => {
  await startApp()
  showView.value = true
})

// console.log(route.name)
// 初始化数据颜色
let activeNftColor = localStorage.getItem('nftColor')
if (activeNftColor == 1) {
  store.dispatch('SET_nftColor', 1)
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
