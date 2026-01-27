const pokedexService = new PokedexService()

let pokedexItems = []

let currentPage = 1
let totalPages = 1

const pokedexListSection = document.querySelector('.pokedex-list')

function renderList() {
  pokedexListSection.innerHTML = pokedexItems
    .map(
      pokedexItem => `<article>
        <header>
          <h2>
            ${pokedexItem.name in NAME_EXCEPTIONS ? NAME_EXCEPTIONS[pokedexItem.name] : pokedexItem.name.split('-').join(' ')}
          </h2>

          <div class="pokemon-type">
            ${
              pokedexItem
                .types
                .map(typesItem => `<span style="color: ${POKEMON_TYPE_COLORS[typesItem?.type?.name.toUpperCase()] ?? 'black'}">
                    ${typesItem.type.name}
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
            src="${pokedexItem.sprites.other['official-artwork']['front_default']}"
            alt="${pokedexItem.name}"
          />
        </div>
      </article>`
    )
    .join('')
}

async function main() {
  const urlParams = new URLSearchParams(window.location.search)

  const urlPage = parseInt(urlParams.get('page'))

  console.log('page', urlPage)

  currentPage = isNaN(urlPage) ? 1 : urlPage
  
  const { count, results } = await pokedexService.list(currentPage)

  pokedexItems = results
  totalPages = Math.ceil(count / ITEMS_PER_PAGE)

  renderList()

  renderPaginationButtons()
}

main()