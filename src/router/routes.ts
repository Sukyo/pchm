import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: to => {
      // 方法接收目标路由为参数
      return {
        name: 'Login'
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/user/login/Login.vue')
  },
  {
    path: '/layout',
    name: 'Layout',
    redirect: to => {
      return {
        path: '/layout/user'
      }
    },
    component: () => import('@/pages/layout/Layout.vue'),
    children: [
      {
        path: '/layout/user',
        component: () => import('@/pages/layout/user/User.vue')
      },
      {
        path: '/layout/subject',
        component: () => import('@/pages/layout/subject/Subject.vue')
      }
      ,
      {
        path: '/layout/question',
        component: () => import('@/pages/layout/question/Question.vue')
      }
      ,
      {
        path: '/layout/chart',
        component: () => import('@/pages/layout/chart/Chart.vue')
      }
      ,
      {
        path: '/layout/business',
        component: () => import('@/pages/layout/business/Business.vue')
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