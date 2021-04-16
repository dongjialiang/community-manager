// 从vue的路由管理器导入创建路由函数和历史
import { createRouter, createWebHistory } from 'vue-router'

// 导入页面视图文件
import Home from './views/Home.vue'
const pages = import.meta.glob('./views/*.vue')
const titles = {
  '/home': '首页',
  '/lifeservice': '生活服务',
  '/businessactivity': '商铺活动',
  '/propertynotice': '物业通知',
  '/park': '停车信息',
  '/register': '出入登记',
  '/repair': '报修',
  '/complaint': '投诉',
  '/usermanager': '用户信息',
  '/userprefill': '预填信息',
  '/signup': '注册',
  '/login': '登录'
}

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/views(.*)\.vue$/)[1].toLowerCase()
  const homePath = name === '/home'
  return {
    path: homePath ? '/' : name,
    alias: name,
    component: homePath ? Home : pages[path], // () => import('./views/*.vue')
    meta: { title: titles[name] }
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - 小区交流管理系统`
  next()
})

export default router