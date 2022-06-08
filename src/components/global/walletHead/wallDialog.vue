<template>
  <van-dialog v-model:show="show" title="" :showConfirmButton="false" :closeOnClickOverlay="true" @close="closeFa">
    <section class="wallDialog">
      <h3>连接钱包</h3>
      <div class="wall flex_ja flex_ac cursor">
        <div @click="connectWall(1)">
          <div class="imgBox">
            <img class="cursor" src="/images/icon/metamask.png" alt="" />
          </div>
          <p>MetaMask</p>
        </div>
        <div @click="connectWall(2)">
          <div class="imgBox">
            <img class="cursor" src="/images/icon/walletConnect.png" alt="" />
          </div>
          <p>WalletConnect</p>
        </div>
      </div>
    </section>
  </van-dialog>
</template>

<script setup lang="ts">
import wallet from '@/utils/wallet'
import { Toast } from 'vant'
import { useStore } from '@/store/index'
const store = useStore()
const props = defineProps({ show: Boolean })
const emits = defineEmits(['close'])

let show = ref(false)

watch(
  () => props.show,
  val => {
    show.value = val
  }
)

const closeFa = () => {
  emits('close')
}

const connectWall = async val => {
  switch (val) {
    case 1:
      window.postTrack('login_metamask_btnclick')
      break
    case 2:
      window.postTrack('login_walletcon_btnclick')
      break
  }
  try {
    val == 2 && localStorage.setItem('walletconnect', '') //walletconnect 连接后会自己在本地缓存 目的清空缓存
    const address = await wallet.connectWallet(val)
    console.log('address', address)
    const xToken = await wallet.getToken(address)
    console.log(xToken)
    window.postTrack('login_success')
    if (address && xToken) {
      store.dispatch('SET_address', address)
      store.dispatch('SET_connectType', val)
      store.dispatch('SET_xToken', xToken)
      closeFa()
    }
  } catch (error) {
    window.postTrack('login_fail')
    console.log('connectWall', error)
  }
}
</script>

<style lang="less" scoped>
.wallDialog {
  font-family: Poppins-Medium;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0;
  text-align: center;
  font-weight: 500;
  padding: 15px 15px 30px;
  text-align: center;
  h3 {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #000000;
    text-align: center;
    font-weight: 500;
    margin-bottom: 25px;
  }
  .imgBox {
    margin-bottom: 10px;
  }
  img {
    width: 70px;
  }
}
</style>
