const pokedexService = new PokedexService()

const items = []
const currentPage = 1

const pokedexListSection = document.querySelector('.pokedex-list')

function renderList() {
  pokedexListSection.innerHTML = pokedexService.items
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
  await pokedexService.list()

  renderList()
}

main()