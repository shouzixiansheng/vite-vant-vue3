import metamask from './metamask'
import wallectConnect from './wallectConnect'
// import { postToken } from '@/api/login'
import erc20Abi from '@/api/ABI/erc20'
import detailAbi from '@/api/ABI/detail'
import nftAbi from '@/api/ABI/nft'
import coinAbi from '@/api/ABI/coin'

import store from '@/store/index'
import Web3 from 'web3/dist/web3.min.js'
import { Toast } from 'vant'
const contractAddress = import.meta.env.VITE_CHAIN_USDT //币地址
const detailAddress = import.meta.env.VITE_CHAIN_DETAIL // 划转参数地址
const nftAddress = import.meta.env.VITE_CHAIN_NFT //nft地址
const platAddress = import.meta.env.VITE_CHAIN_ZHIYA //质押平台地址
const DECIMAL = import.meta.env.VITE_CHAIN_DECIMAL //精度
const chainName = import.meta.env.VITE_CHAIN_NAME //链名称

export default {
  connectWallet: async (connectType = 1) => {
    try {
      let walletAddress = null
      if (connectType == 2) {
        //如果是wallectConnect
        console.log('connectType', connectType)
        walletAddress = await wallectConnect.connectWallet()
        console.log('walletAddress', walletAddress)
        // 添加断开的监听事件
        window.web3Provider.on('disconnect', (code, reason) => {
          console.log('disconnect')
          store.dispatch('CLEAR_OUT')
        })
      } else {
        //metamask
        walletAddress = await metamask.connectMetamask()
        metamask.watchNetWordChange()
      }
      const chainId = await window.web3.eth.getChainId()
      console.log({ chainId }, import.meta.env.VITE_CHAIN_ID)
      if (chainId != import.meta.env.VITE_CHAIN_ID) {
        Toast(`请连接${import.meta.env.VITE_CHAIN_NAME}`)
        return
      }
      return walletAddress
    } catch (error) {
      console.log('连接钱包失败')
      localStorage.removeItem('connectStatus')
      localStorage.removeItem('connectType')
    }
  },

  getToken: async address => {
    const currectAddress = store.getters.userAddress // 用户地址
    const connectType = store.getters.connectType
    const agentId = store.getters.agentId
    console.log('connectType', connectType)
    let cAddress = address || currectAddress
    let time = new Date().getTime()
    let host = window.location.hostname
    console.log('host', host)
    console.log('cAddress', cAddress)
    let signMessage = `[${host} ${time}] I, hereby verify that I am the owner/creator of the address [${cAddress}]`
    return new Promise(async (resolve, reject) => {
      window.web3.eth.personal
        .sign(window.web3.utils.utf8ToHex(signMessage), cAddress)
        .then(async signature => {
          let params = { signature, signMessage }
          if (agentId) {
            params.agentId = agentId
          }
          let letxToken = '123'
          // let letxToken = await postToken(params)
          resolve(letxToken)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getBalance: async () => {
    const currectAddress = store.getters.userAddress // 用户地址
    const tokenContract = new window.web3.eth.Contract(erc20Abi, contractAddress)
    // console.log(erc20Abi, contractAddress, tokenContract, currectAddress)
    try {
      const balance = await tokenContract.methods.balanceOf(currectAddress).call()
      console.log(balance)
      store.dispatch('SET_myWallBalance', balance)
      return balance
    } catch (error) {
      throw new Error(error)
    }
  },

  //  授权额度
  allowance: async () => {
    const currectAddress = store.getters.userAddress // 用户地址
    const tokenContract = new window.web3.eth.Contract(erc20Abi, contractAddress)
    try {
      const result = await tokenContract.methods.allowance(currectAddress, detailAddress).call()
      console.log('allowance', result)
      return result
    } catch (error) {
      console.log({ error })
      throw new Error(error)
    }
  },

  getReceiptStatus: async tx => {
    return new Promise(async (resolve, reject) => {
      const getStatus = async () => {
        const status = await window.web3.eth.getTransactionReceipt(tx)
        console.log({ status })
        if (status && status.status) {
          resolve(status.status)
        } else {
          setTimeout(async () => {
            await getStatus()
          }, 5000)
        }
      }
      await getStatus()
    })
  },

  approve: async () => {
    const currectAddress = store.getters.userAddress // 用户地址
    const tokenContract = new window.web3.eth.Contract(erc20Abi, contractAddress)
    const totalSupply = await tokenContract.methods.totalSupply().call()
    console.log({ tokenContract, totalSupply, currectAddress })
    try {
      return new Promise((resolve, reject) => {
        tokenContract.methods
          .approve(detailAddress, totalSupply)
          .send({ from: currectAddress })
          .on('transactionHash', hash => {
            console.log('approve: 获取交易hash: ', hash)
            // resolve(hash)
          })
          .on('receipt', receipt => {
            console.log('approve: 获取链上返回的结果：', receipt)
            resolve(receipt)
          })
          // .on('confirmation', (confirmationNumber, receipt, latestBlockHash) => {
          //     console.log("approve: 链上confirmation结果返回，确认数：",confirmationNumber)
          //     console.log("approve: 链上confirmation结果返回，返回数据：",receipt)
          // })
          .on('error', (error, gasError) => {
            // 如果是 out of gas 错误, 第二个参数为交易收据
            console.error('错误：', error)
            reject(error)
          })
      })
    } catch (error) {
      console.log({ error })
      throw new Error(error)
    }
  },

  web3Provider: (connectType = 1) => {
    if (connectType == 1 && window.ethereum) {
      return window.ethereum
    } else if (connectType == 2) {
      return wallectConnect.walletWeb3Provider()
    } else {
      return window.ethereum || wallectConnect.walletWeb3Provider()
    }
  },
}
