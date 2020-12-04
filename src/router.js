// 从vue的路由管理器导入创建路由函数和历史
import { createRouter, createWebHashHistory } from 'vue-router'
// 导入页面视图文件
import Home from './views/Home.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      alias: '/home',
      component: Home
    },
    {
      path: '/lifeService',
      component: () => import('./views/LifeService.vue')
    },
    {
      path: '/businessActivity',
      component: () => import('./views/BusinessActivity.vue')
    },
    {
      path: '/propertyNotice',
      component: () => import('./views/PropertyNotice.vue')
    },
    {
      path: '/park',
      component: () => import('./views/Park.vue')
    },
    {
      path: '/register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/repair',
      component: () => import('./views/Repair.vue')
    },
    {
      path: '/complaint',
      component: () => import('./views/Complaint.vue')
    },
    {
      path: '/user',
      component: () => import('./views/User.vue')
    },
    {
      path: '/signup',
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/login',
      component: () => import('./views/Login.vue')
    },
  ]
})

