const POKEDEX_ENDPOINT_URL = 'https://pokeapi.co/api/v2/pokemon'

const ITEMS_PER_PAGE = 18

class PokedexService {
  async get(pokemonUrl) {
    const response = await fetch(pokemonUrl)

    const json = await response.json()

    return json
  }

  async list(pageNumber) {
    try {
      const queryArr = [`limit=${ITEMS_PER_PAGE}`]

      if (pageNumber) {
        queryArr.unshift(`offset=${ITEMS_PER_PAGE * (pageNumber - 1)}`)
      }

      const response = await fetch(`${POKEDEX_ENDPOINT_URL}?${queryArr.join('&')}`)

      const json = await response.json()

      const { count, results } = json

      const fullResults = await Promise.all(results.map(resultItem => this.get(resultItem.url)))

      return {
        count,
        results: fullResults,
      }
    } catch (err) {
      console.error(err)
    }
  }
}