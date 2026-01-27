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
            ${pokedexItem.name}
          </h2>

          <div>
            #${pokedexItem.id}
          </div>

          <div>
            ${pokedexItem.types.map(typesItem => typesItem.type.name).join(' ')}
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