const pokedexService = new PokedexService()

let pokedexItems = []

let currentPage = 1
let totalPages = 1

const pokedexListSection = document.querySelector('.pokedex-list')

/*
  Ponto inicial

  Busca página atual pela URL e ativa renderizações de listagem e paginação
*/
async function main() {  
  const urlParams = new URLSearchParams(window.location.search)

  const urlPage = parseInt(urlParams.get('page'))

  await loadPageItems(isNaN(urlPage) ? 1 : urlPage)
}

main()

function updateUrlQueryWithoutReload(newQuery) {
  if (history.pushState) {
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + newQuery

    window.history.pushState({ path: newUrl }, '' , newUrl)
  }
}

async function loadPageItems(pageNumber) {
  try {
    setLoading(true)

    window.scrollTo(0, 0)

    currentPage = pageNumber

    const { count, results } = await pokedexService.list(currentPage)

    pokedexItems = results
    totalPages = Math.ceil(count / ITEMS_PER_PAGE)

    renderList()
    renderPaginationButtons()

    updateUrlQueryWithoutReload(`?page=${currentPage}`)
  } catch (err) {
    renderErrorAlert()
  } finally {
    setLoading(false)
  }
}

/*
  Ativa o carregamento e as animações via CSS
*/
function setLoading(bool) {
  if (bool && pokedexListSection.getAttribute('aria-busy') !== 'true') {
    pokedexListSection.setAttribute('aria-busy', 'true')
  }

  if (!bool && pokedexListSection.getAttribute('aria-busy') !== 'false') {
    pokedexListSection.setAttribute('aria-busy', 'false')
  }
}

/*
  Renderização da listagem de pokémons
*/

function renderList() {
  pokedexListSection.innerHTML = pokedexItems
    .map(pokedexItem => {
      const pokemonName = pokedexItem.name in NAME_EXCEPTIONS
        ? NAME_EXCEPTIONS[pokedexItem.name]
        : pokedexItem.name.split('-').join(' ')

      const pokemonTypes = pokedexItem.types.map(typesItem => ({
        color: POKEMON_TYPES_DATA[typesItem?.type?.name.toUpperCase()]?.COLOR ?? 'black',
        text: POKEMON_TYPES_DATA[typesItem?.type?.name.toUpperCase()]?.TEXT ?? 'black'
      }))

      const pokemonImage = pokedexItem.sprites?.other?.['official-artwork']?.['front_default'] ?? './assets/images/vectors/empty-image.svg'

      return `<article>
        <header>
          <h2>
            ${pokemonName}
          </h2>

          <div class="pokemon-type">
            ${
              pokemonTypes
                .map(typesItem => `<span style="color: ${typesItem.color}">
                    ${typesItem.text}
                  </span>
                `)
                .join(' ')
            }
          </div>

          <div
            class="pokemon-number"
          >
            #${pokedexItem.id}
          </div>
        </header>

        <div class="image-container">
          <img
            src="${pokemonImage}"
            alt="${pokedexItem.name}"
          />
        </div>
      </article>`
    })
    .join('')
}

function renderEmptyAlert() {
  pokedexListSection.innerHTML = `<div class="pokedex-list-alert">
    <h2>Nenhum item encontrado</h2>

    <p>
      Tente usar um nome mais específico (exemplos: pikachu, squirtle, charmander, etc.)
    </p>
  </div>`
}

function renderErrorAlert() {
  pokedexListSection.innerHTML = `<div class="pokedex-list-alert">
    <h2>Ocorreu um erro</h2>

    <p>
      Por favor, tente novamente.
    </p>
  </div>`
}
