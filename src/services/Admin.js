// 导入http请求库
import request from '../request'
// 导出请求命令
export default {
  async signup(data) {
    return await request.post('admin/signup', data)
  },
  async login(data) {
    return await request.post('admin/login', data)
  }
}
