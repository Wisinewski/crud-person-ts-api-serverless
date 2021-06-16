export class ServerError extends Error {
  constructor (stack: string) {
    super('Erro interno no servidor')
    this.name = 'ServerError'
    this.stack = stack
  }
}