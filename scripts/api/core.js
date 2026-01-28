/*
  Arquivo base para conexão com a API (para evitar repetições de código desnecessárias)
*/

class CoreApiService {
  baseUrl = ''
  
  constructor(path) {
    this.baseUrl = `${POKEDEX_ENDPOINT_URL}/${path}`
  }

  async request(url) {
    const response = await fetch(url)

    if (!response.ok) {
      throw new AppError('Error during request', response.status)
    }

    const json = await response.json()

    return json
  }

  async get(id) {
    return this.request(`${this.baseUrl}/${id}`)
  }

  async list(query) {
    return await this.request(`${this.baseUrl}?${query}`)
  }
}