// router/index.ts ----------------创建路由------------------
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import { routes } from "./config";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const router = createRouter({
	history: createWebHashHistory(),
	routes
})
router.beforeEach((to, from) => {
	NProgress.start()
	return true
})
router.afterEach(() => { NProgress.done() })

export default router

