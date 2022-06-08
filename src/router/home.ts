const router = [
	{
		path: '/home',
		name: 'home',
		meta: { requireAuth: false, keepAlive: false },
		component: () => import("@/views/home/index.vue")
	}
]
export default router