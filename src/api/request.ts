import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { Toast, Notify } from 'vant'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
import store from '@/store/index'

axios.defaults.timeout = 20000

const service: AxiosInstance = axios.create({
	// baseURL: import.meta.env.DEV ? import.meta.env.VITE_BASEURL : '/api/'
	// baseURL: 'http://pledge.saifurong.cn/api/'
})

service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const xToken = store.getters.xToken || ''
		config.headers = { "X-Token": xToken }
		return config
	},
	error => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	(response: AxiosResponse) => {
		const res = response.data
		if (res.code == 0) {
			return res
		} else {
			// 	签名到期
			if (res.code == '3000') {
				store.dispatch('CLEAR_OUT')
				return
			}
			return Promise.reject(res)
		}
	},
	error => {
		console.log('err' + error) // for debug
		// Toast(error.message)
		return Promise.reject(error)
	}
)

export const request = (method: Method, url: string, data = {}, isNeedAddress = false) => {
	// 是否必须是钱包登录状态,否则打开登录弹窗
	if (isNeedAddress && !store.getters.xToken) {
		window.openWall()
		throw new Error('error');
	}
	return new Promise((resolve, reject) => {
		service({ method, url, data: ['post', 'delete'].includes(method) ? data : {}, params: ['post', 'delete'].includes(method) ? {} : data })
			.then(res => res.data != undefined ? resolve(res.data) : resolve(res)).catch(err => {
				reject(err)
			})
	})
}