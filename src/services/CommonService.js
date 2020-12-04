import request from '../request'

export default {
  async getAllService(name, query = '{}', page = 1, page_size = 24,
    result_field = '{}') {
    return await request.get(
      `${name}/all/${query}/${page}/${page_size}/${result_field}`)
  },
  async createOneService(name, data) {
    return await request.post(`${name}/`, data)
  },
  async createManyService(name, data) {
    return await request.post(`${name}/many`, data)
  },
  async updateService(name, query, data, result_field = '{}') {
    return await request.put(`${name}/${query}/${result_field}`, data)
  },
  async deleteManyService(name, query, result_field = '{}') {
    return await request.delete(`${name}/many/${query}/${result_field}`)
  },
}
