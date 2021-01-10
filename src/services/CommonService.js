import request from '../request'

export default {
  async getAllService(name, query = '{}', page = 1, page_size = 24,
    result_field = '{}', querystring) {
    let url = `${name}/all/${query}/${page}/${page_size}/${result_field}`;
    if (querystring !== undefined) {
      url += '?'
      for (const [key, val] of Object.entries(querystring)) {
        url += `${key}=${val}`
      }
    }
    return await request.get(url)
  },
  async createOneService(name, data) {
    return await request.post(`${name}/one`, data)
  },
  async createManyService(name, data) {
    return await request.post(`${name}/many`, data)
  },
  async updateService(name, query, data, result_field = '{}') {
    return await request.put(`${name}/one/${query}/${result_field}`, data)
  },
  async deleteManyService(name, query, result_field = '{}') {
    return await request.delete(`${name}/many/${query}/${result_field}`)
  },
}
