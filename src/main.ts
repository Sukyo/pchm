import { createApp } from 'vue'
import 'element-plus/lib/theme-chalk/index.css';
import ElementUIPlus from '@/plugins/elementPlus';
import App from '@/App.vue'
import store from '@/store'
import router from '@/router';
import { $loading } from '@/components/common/extend';
window.app = null;;
Object.defineProperty(window, 'app', {
    value: Object.assign({}, { $loading }),
    writable: false
})
createApp(App)
    .use(store)
    .use(router)
    .use(ElementUIPlus)
    .mount('#app')