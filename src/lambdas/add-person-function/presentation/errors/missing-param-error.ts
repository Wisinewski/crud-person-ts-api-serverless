export class MissingParamError extends Error {
  constructor (param: string) {
    super(`O parâmetro ${param} é obrigatório`)
    this.name = 'MissingParamError'
  }
}