import request from '../request'

export default {
  async getViewFnList(viewFnName) {
    return await request.get(`viewFn/${viewFnName}`)
  }
}