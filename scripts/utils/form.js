/*
  Arquivo que lida com o formulário de pesquisa

  Observação: Por limitações da PokeAPI a pesquisa está bem específica, sendo necessário digitar o nome exato do pokémon
*/

const searchForm = document.querySelector('.search-form')
const searchFormInput = document.querySelector('.search-form input')

async function handleSubmit(event) {
  event.preventDefault()

  if (searchFormInput.value) {
    try {
      setLoading(true)

      hidePaginationButtons()
  
      const pokemonData = await pokedexService.get(searchFormInput.value)

      pokedexItems = [pokemonData]

      renderList()
    } catch (err) {
      if (err instanceof AppError && err?.status === 404) {
        renderEmptyAlert()
      } else {
        renderErrorAlert()
      }
    } finally {
      setLoading(false)
    }
  } else {
    main()
  }
}

searchForm.addEventListener('submit', handleSubmit)