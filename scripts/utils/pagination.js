/*
  Arquivo que renderiza a paginação e calcula os botões certos que devem aparecer
  dependendo da página atual
*/

const paginationUl = document.querySelector('.pagination ul')

function renderPaginationButtons() {
  const previousPage = currentPage - 1
  const nextPage = currentPage + 1

  const previousPages = [currentPage - 2, currentPage - 1]
    .filter(pageNumber => pageNumber > 1)

  const nextPages = [currentPage + 1, currentPage + 2]
    .filter(pageNumber => pageNumber < totalPages)

  const showFirstEllipsis = currentPage >= 5
  const showSecondEllipsis = currentPage <= totalPages - 4

  paginationUl.innerHTML = `
    <li>
      <button
        class="default-button ${previousPage < 1 ? 'default-button--disabled' : ''}"
        onclick="loadPageItems(${previousPage})"
      >
        <img
          src="./assets/images/icons/arrow-left.png"
          alt="Seta para a esquerda"
        >

        <span>Anterior</span>
      </button>
    </li>

    ${
      currentPage !== 1
        ? `<li>
            <button
              class="default-button"
              onclick="loadPageItems(1)"
            >
              1
            </button>
          </li>`
        : ''
    }

    ${showFirstEllipsis ? '<li><a class="ellipsis">&#8230;</a></li>' : ''}

    ${
      previousPages
        .map(pageNumber => `<li>
            <button
              class="default-button"
              onclick="loadPageItems(${pageNumber})"
            >
              ${pageNumber}
            </button>
          </li>`
        )
        .join('')
    }

    <li>
      <button
        aria-current="page"
        class="default-button default-button--selected"
      >
        ${currentPage}
      </button>
    </li>

    ${
      nextPages
        .map(pageNumber => `<li>
            <button
              class="default-button"
              onclick="loadPageItems(${pageNumber})"
            >
              ${pageNumber}
            </button>
          </li>`
        )
        .join('')
    }

    ${showSecondEllipsis ? '<li><a class="ellipsis">&#8230;</a></li>' : ''}

    ${
      currentPage !== totalPages
        ? `<li>
            <button
              class="default-button"
              onclick="loadPageItems(${totalPages})"
            >
              ${totalPages}
            </button>
          </li>`
        : ''
    }

    <li>
      <button
        class="default-button ${nextPage > totalPages ? 'default-button--disabled' : ''}"
        onclick="loadPageItems(${nextPage})"
      >
        <span>Próxima</span>

        <img
          src="./assets/images/icons/arrow-right.png"
          alt="Seta para a direta"
        >
      </button>
    </li>
  `
}

function hidePaginationButtons() {
  paginationUl.innerHTML = ''
}