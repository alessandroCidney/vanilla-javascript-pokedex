const paginationUl = document.querySelector('.pagination ul')

function renderPaginationButtons() {
  const previousPage = currentPage - 1
  const nextPage = currentPage + 1

  // const previousPages = [currentPage - 2, currentPage - 1]
  // const nextPages = [currentPage + 1, currentPage + 2]

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