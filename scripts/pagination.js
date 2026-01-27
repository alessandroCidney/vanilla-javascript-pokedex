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
      <a
        href="?page=${previousPage}"
        class="default-button ${previousPage < 1 ? 'default-button--disabled' : ''}"
      >
        <img
          src="./assets/images/icons/arrow-left.png"
          alt="Seta para a esquerda"
        >

        Anterior
      </a>
    </li>

    ${
      currentPage !== 1
        ? `<li>
            <a
              href="?page=1"
              class="default-button"
            >
              1
            </a>
          </li>`
        : ''
    }

    ${showFirstEllipsis ? '<li><a class="ellipsis">&#8230;</a></li>' : ''}

    ${
      previousPages
        .map(pageNumber => `<li>
            <a
              href="?page=${pageNumber}"
              class="default-button"
            >
              ${pageNumber}
            </a>
          </li>`
        )
        .join('')
    }

    <li>
      <a
        href="#"
        aria-current="page"
        class="default-button default-button--selected"
      >
        ${currentPage}
      </a>
    </li>

    ${
      nextPages
        .map(pageNumber => `<li>
            <a
              href="?page=${pageNumber}"
              class="default-button"
            >
              ${pageNumber}
            </a>
          </li>`
        )
        .join('')
    }

    ${showSecondEllipsis ? '<li><a class="ellipsis">&#8230;</a></li>' : ''}

    ${
      currentPage !== totalPages
        ? `<li>
            <a
              href="?page=${totalPages}"
              class="default-button"
            >
              ${totalPages}
            </a>
          </li>`
        : ''
    }

    <li>
      <a
        href="?page=${nextPage}"
        class="default-button ${nextPage > totalPages ? 'default-button--disabled' : ''}"
      >
        Próxima

        <img
          src="./assets/images/icons/arrow-right.png"
          alt="Seta para a direta"
        >
      </a>
    </li>
  `
}