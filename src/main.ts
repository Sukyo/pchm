import { createApp } from 'vue'
import '@/styles/main.scss'
import 'element-plus/lib/theme-chalk/index.css';
import ElementUIPlus from '@/plugins/elementPlus';
import App from '@/App.vue'
import router from '@/router';
createApp(App)
    .use(router)
    .use(ElementUIPlus)
    .mount('#app')