/*
  Arquivo para conexão com endpoint de pokémons
*/

class PokedexService extends CoreApiService {
  constructor() {
    super('pokemon')
  }

  async list(pageNumber) {
    const queryArr = [`limit=${ITEMS_PER_PAGE}`]

    if (pageNumber) {
      queryArr.unshift(`offset=${ITEMS_PER_PAGE * (pageNumber - 1)}`)
    }

    const response = await super.list(queryArr.join('&'))

    const { count, results } = response

    const fullResults = await Promise.all(results.map(resultItem => this.request(resultItem.url)))

    return {
      count,
      results: fullResults,
    }
  }
}