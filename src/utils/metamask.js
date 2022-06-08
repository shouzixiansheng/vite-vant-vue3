// import { ElNotification } from 'element-plus'
// import { i18n } from "../modules/i18n"
// import { useAddressStore } from '~/stores/address'
// import { clearAccount } from './utils'
import store from '@/store/index'
import Web3 from 'web3/dist/web3.min.js'
// import Web3 from 'web3'
import { Toast } from 'vant'
export default {
  // 连接metamask 返回address
  connectMetamask: async () => {
    if (window.ethereum) {
      try {
        // 重置web3Provider和web3
        window.web3Provider = window.ethereum
        window.web3 = new Web3(window.ethereum)
        console.log(window.web3)
        // 如果存在metamask钱包，尝试请求授权
        // await window.ethereum.enable();
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        // 获取钱包地址
        console.log('test')
        const address = await window.web3.eth.getCoinbase()
        console.log(address)
        return address
      } catch (error) {
        console.log('error')
        if (error.code === 4001) {
          Toast('连接失败')
        }
        throw new Error(error)
      }
    } else {
      Toast('连接失败')
      console.log('connectMetamask')
      throw new Error('连接失败')
    }
  },
  // 监听accountsChanged
  watchNetWordChange: async () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async () => {
        console.log('disconnect')
        window.location.href = '/'
        store.dispatch('CLEAR_OUT')
      })
      window.ethereum.on('chainChanged', async () => {
        console.log('disconnect')
        window.location.href = '/'
        store.dispatch('CLEAR_OUT')
      })
    }
  },
}
