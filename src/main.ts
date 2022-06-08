import { createApp } from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import router from "./router"
import 'vant/lib/index.css'
import '@/assets/styles/main.less'
import { vantComponents } from './vant'
import store, { key } from './store'
import 'swiper/less'
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import { i18n } from '@/utils/i18n'

// vant-ui组件国际化

const app = createApp(App)
// window.Buffer = Buffer
vantComponents(app)
app.use(store, key).use(router).use(i18n)
router.isReady().then(() => app.mount('#app'))
export default app
