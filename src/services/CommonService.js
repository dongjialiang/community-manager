import request from '../request'

export default {
  async getAllService(name, query = '{}', page = 1, page_size = 24) {
    return await request.get(
      `${name}/all/get/${query}/${page}/${page_size}`)
  },
  async createOneService(name, data) {
    return await request.post(`${name}/create`, data)
  },
  async createManyService(name, data) {
    return await request.post(`${name}/many/create`, data)
  },
  async updateService(name, query, data) {
    return await request.put(`${name}/update/${query}`, data)
  },
  async deleteManyService(name, query) {
    return await request.delete(`${name}/many/delete/${query}`)
  },
}
