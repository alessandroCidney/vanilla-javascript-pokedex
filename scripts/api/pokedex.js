/*
  Arquivo para conexão com endpoint de pokémons
*/

class PokedexService extends CoreApiService {
  cachedPokemonDetails = {}

  constructor() {
    super('pokemon')
  }

  async getPokemonDetails(pokemonUrl) {
    if (!this.cachedPokemonDetails[pokemonUrl]) {
      this.cachedPokemonDetails[pokemonUrl] = await this.request(pokemonUrl)
    }

    return this.cachedPokemonDetails[pokemonUrl]
  }

  async list(pageNumber) {
    const queryArr = [`limit=${ITEMS_PER_PAGE}`]

    if (pageNumber) {
      queryArr.unshift(`offset=${ITEMS_PER_PAGE * (pageNumber - 1)}`)
    }

    const response = await super.list(queryArr.join('&'))

    const { count, results } = response

    const fullResults = await Promise.all(results.map(resultItem => this.getPokemonDetails(resultItem.url)))

    return {
      count,
      results: fullResults,
    }
  }
}