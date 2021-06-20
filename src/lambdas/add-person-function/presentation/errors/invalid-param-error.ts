export class InvalidParamError extends Error {
  constructor (field: string) {
    super(`Campo inválido: ${field}`)
    this.name = 'InvalidParamError'
  }
}