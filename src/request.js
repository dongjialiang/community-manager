// 导入外部状态管理文件
import createStore from './store'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const baseURL = 'http://localhost:3001/'
let toastTimer

const store = createStore() // 外部管理状态

/**
 * 发送HTTP请求的方法(具体方法为传入的方法类型)
 * @param {string} method - 请求所用的方法
 * @param {string} path - 请求的网站路径
 * @param {Object} data - 要发送的负载数据
 */
const useMethod = async (method, path, data) => {
  Nprogress.inc()
  const init = {
    method,
    headers: Object.create(null)
  }
  const token = store.state.token
  if (token !== '') {
    init.headers['Authorization'] = `Bearer ${token}`
  }
  if (method === 'POST' || method === 'PUT') {
    init.headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(data)
  } else if (method === 'UPLOAD') {
    init.method = 'POST'
    init.body = data
  }
  const response = await fetch(`${baseURL}${path}`, init)

  if (response) {
    Nprogress.done()
  }

  const result = await response.json()

  if (response.status === 422 && result.message === '用户认证错误.') {
    store.setToken('')
    store.setUser('')
    return;
  }

  if (result && method !== 'GET') {
    store.setToastMsg(result.message)
    if (toastTimer) {
      clearTimeout(toastTimer)
    }
    toastTimer = setTimeout(() => {
      store.setToastMsg('')
    }, 3000)
  }
  return { data: result, status: response.status }
}

// 创建HTTP请求对象
const request = {
  get: (path) => useMethod('GET', path),
  put: (path, data) => useMethod('PUT', path, data),
  post: (path, data) => useMethod('POST', path, data),
  delete: (path) => useMethod('DELETE', path),
  fileUpload: (path, data) => useMethod('UPLOAD', path, data)
}
// 导出HTTP请求对象
export default request