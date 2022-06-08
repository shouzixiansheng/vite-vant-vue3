import { request } from './request';

//  登录获取token
export const postToken = (params: { signature: string, signMessage: string }) => {
	return request('post', '/api/v1/auth/fetch-token', params)
}

// 埋点
export const postTrack = (params: { event: string, deviceId: string }) => {
	return request('post', '/api/v1/tracking/event-push', params)
}

