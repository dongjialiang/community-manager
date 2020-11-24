// 导入外部状态管理文件
import createStore from './store'

const baseURL = 'http://localhost:3001/'

const store = createStore() // 外部管理状态
/**
 * 发送HTTP请求的方法(具体方法为传入的方法类型)
 * @param {String} method - 请求所用的方法
 * @param {String} path - 请求的网站路径
 * @param {Object} data - 要发送的负载数据
 */
const useMethod = async (method, path, data) => {
  const init = {
    method,
    headers: {
      Authorization: `Bearer ${store.state.value.token}`
    }
  }
  if (method === 'POST' || method === 'PUT') {
    init.headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(data)
  } else if (method === 'UPLOAD') {
    init.method = 'POST'
    init.body = data
  }
  const response = await fetch(`${baseURL}${path}`, init)

  const result = await response.json()
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