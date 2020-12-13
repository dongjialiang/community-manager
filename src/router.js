// 从vue的路由管理器导入创建路由函数和历史
import { createRouter, createWebHashHistory } from 'vue-router'
// 导入页面视图文件
import Home from './views/Home.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      alias: '/home',
      component: Home,
      meta: {
        title: '主页'
      }
    },
    {
      path: '/lifeService',
      component: () => import('./views/LifeService.vue'),
      meta: {
        title: '生活服务'
      }
    },
    {
      path: '/businessActivity',
      component: () => import('./views/BusinessActivity.vue'),
      meta: {
        title: '商铺活动'
      }
    },
    {
      path: '/propertyNotice',
      component: () => import('./views/PropertyNotice.vue'),
      meta: {
        title: '物业通知'
      }
    },
    {
      path: '/park',
      component: () => import('./views/Park.vue'),
      meta: {
        title: '停车信息',
      }
    },
    {
      path: '/register',
      component: () => import('./views/Register.vue'),
      meta: {
        title: '出入登记'
      }
    },
    {
      path: '/repair',
      component: () => import('./views/Repair.vue'),
      meta: {
        title: '报修'
      }
    },
    {
      path: '/complaint',
      component: () => import('./views/Complaint.vue'),
      meta: {
        title: '投诉'
      }
    },
    {
      path: '/user',
      component: () => import('./views/User.vue'),
      meta: {
        title: '用户信息'
      }
    },
    {
      path: '/signup',
      component: () => import('./views/Signup.vue'),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/login',
      component: () => import('./views/Login.vue'),
      meta: {
        title: '登录'
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - 小区交流管理系统`
  next()
})

export default router