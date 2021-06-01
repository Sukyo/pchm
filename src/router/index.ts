import { createWebHistory, createRouter, RouteRecordRaw, Router } from 'vue-router';
import { defineAsyncComponent } from 'vue';
const routes: RouteRecordRaw[] = [{
    path: '/',
    name: 'Home',
    component: defineAsyncComponent({
        loader: () => import('@/pages/Home.vue')
    }),
}, {
    path: '/user',
    redirect: '/user/login',
    component: defineAsyncComponent({
        loader: () => import('@/pages/user/Index.vue')
    }),
    children: [{
        path: 'login',
        component: defineAsyncComponent({
            loader: () => import('@/pages/user/Login.vue')
        })
    },{
        path: 'register',
        component: defineAsyncComponent({
            loader: () => import('@/pages/user/Register.vue')
        })
    }],
}, {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: defineAsyncComponent({
        loader: () => import('@/pages/error/NotFound.vue')
    })
}];
export default createRouter({
    history: createWebHistory(),
    routes
});