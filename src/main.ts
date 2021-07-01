import { createApp } from 'vue'
import 'element-plus/lib/theme-chalk/index.css';
import ElementUIPlus from '@/plugins/elementPlus';
import App from '@/App.vue'
import store from '@/store'
import router from '@/router';
createApp(App)
    .use(store)
    .use(router)
    .use(ElementUIPlus)
    .mount('#app')