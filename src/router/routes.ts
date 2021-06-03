import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue')
  },
  {
    path: '/user',
    name: 'User',
    redirect: '/user/login',
    component: () => import('@/pages/user/Index.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/user/login/Login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/pages/user/register/Register.vue')
      }
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/error/NotFound.vue')
  }
];
export default routes;