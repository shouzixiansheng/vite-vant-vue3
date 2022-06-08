// import { ElNotification } from 'element-plus'
// import { i18n } from "../modules/i18n"
// import { useAddressStore } from '~/stores/address'
// import { clearAccount } from './utils'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3/dist/web3.min.js'

export default {
  connectWallet: async function () {
    try {
      // 重置web3Provider和web3
      window.web3Provider = this.walletWeb3Provider()
      window.web3 = new Web3(window.web3Provider)
      // 请求授权
      await window.web3Provider.enable()
      console.log(2)
      const address = await this.getCoinbase()
      this.watchNetWordChange()
      return address
    } catch (error) {
      console.log('connectWalletError', error)
    }
  },
  getCoinbase: function () {
    return new Promise(function (resolve, reject) {
      window.web3.eth.getCoinbase((err, coinbase) => {
        if (err) {
          console.log('getCoinbaseerr', err)
          reject(new Error('Unable to retrieve coinbase'))
        } else {
          console.log('getCoinbase', coinbase)
          resolve(coinbase)
        }
      })
    })
  },
  walletWeb3Provider: () => {
    return new WalletConnectProvider({
      // rpc: {
      //   1: 'https://mainnet.infura.io/v3/4c7c7a105f4f4e8ab97567474ddd6f60',
      //   3: 'https://ropsten.infura.io/v3/4c7c7a105f4f4e8ab97567474ddd6f60',
      //   4: 'https://rinkeby.infura.io/v3/4c7c7a105f4f4e8ab97567474ddd6f60',
      //   42: 'https://kovan.infura.io/v3/4c7c7a105f4f4e8ab97567474ddd6f60',
      //   56: 'https://bsc-dataseed.binance.org/',
      // },
      rpc: {
        1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        3: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        42: "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        56: "https://bsc-dataseed.binance.org/"
      }
    })
  },
  // 监听accountsChanged
  watchNetWordChange: async () => {
    // Subscribe to accounts change
    window.web3Provider.on('accountsChanged', () => {
      console.log('disconnect')
      window.location.href = '/'
      store.dispatch('CLEAR_OUT')
    })

    // Subscribe to chainId change
    window.web3Provider.on('chainChanged', () => {
      console.log('disconnect')
      window.location.href = '/'
      store.dispatch('CLEAR_OUT')
    })

    // Subscribe to session disconnection
    window.web3Provider.on('disconnect', () => {
      console.log('disconnect')
      window.location.href = '/'
      store.dispatch('CLEAR_OUT')
    })
  },
}
