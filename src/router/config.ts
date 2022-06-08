
import homeRouter from './home'
export const routes = [
	// 路由重定向
	{
		path: '/',
		redirect: '/home',
	},
	...homeRouter
]