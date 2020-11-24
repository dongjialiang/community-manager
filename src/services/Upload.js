// 导入http请求库
import request from '../request'
// 导出请求命令
export default {
  async imageUpload(path, data) {
    return await request.fileUpload(path, data)
  },
}
