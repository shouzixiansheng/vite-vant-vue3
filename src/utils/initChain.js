
import wallet from './wallet'
export const startApp = async () => {
    
    // 如果是已连接状态
    if (localStorage.connectType&&localStorage.xToken) {
        console.log('开始connectWallet');
        await wallet.connectWallet(localStorage.connectType)
        console.log('结束connectWallet');
    } 

    // 添加监听事件metamask
    wallet.web3Provider(1).on('accountsChanged', accounts => {
        console.log('accountsChanged')
        console.log({accounts})
        if (!accounts[0]) {
            // clearAccount()
        } else {
            // useAddressStore().setNewAddress(accounts[0])
            // location.href = location.href
        }
    })
}

