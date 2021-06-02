export type PersonModel = {
  id: string
  nome: string
  cpf: string
  dataNascimento: Date
  paisNascimento: string
  estadoNascimento: string
  cidadeNascimento: string
  email: string
  nomePai?: string
  nomeMae?: string
}