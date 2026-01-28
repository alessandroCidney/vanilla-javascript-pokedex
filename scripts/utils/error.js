/*
  Classe de erro customizada para facilitar inclusão de informações extras (como status)
*/

class AppError extends Error {
  status = 500

  constructor (message, status) {
    super(message)

    this.status = status
  }
}