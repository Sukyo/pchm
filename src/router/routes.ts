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
    meta: {
      title: '登录'
    },
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
        meta: {
          title: '用户列表',
        },
        component: () => import('@/pages/layout/user/User.vue')
      },
      {
        path: '/layout/subject',
        meta: {
          title: '学科列表',
        },
        component: () => import('@/pages/layout/subject/Subject.vue')
      }
      ,
      {
        path: '/layout/question',
        meta: {
          title: '题库列表',
        },
        component: () => import('@/pages/layout/question/Question.vue')
      }
      ,
      {
        path: '/layout/chart',
        meta: {
          title: '数据预览',
        },
        component: () => import('@/pages/layout/chart/Chart.vue')
      }
      ,
      {
        path: '/layout/business',
        meta: {
          title: '企业列表',
        },
        component: () => import('@/pages/layout/business/Business.vue')
      }
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '页面不见啦'
    },
    component: () => import('@/pages/error/NotFound.vue')
  }
];
export default routes;