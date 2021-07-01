import { createWebHashHistory, createRouter } from 'vue-router';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css'
import routes from './routes';
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    Nprogress.start();
    return next()
})
router.afterEach((to, from, failure) => {
    document.title = `刷题宝典-${to.meta.title}`;
    Nprogress.done();
})
export default router