export class CpfInUseError extends Error {
  constructor () {
    super('Este CPF já está em uso')
    this.name = 'CpfInUseError'
  }
}