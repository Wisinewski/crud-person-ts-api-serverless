export const personSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    nome: {
      type: 'string'
    },
    cpf: {
      type: 'string'
    },
    dataNascimento: {
      type: 'string'
    },
    paisNascimento: {
      type: 'string'
    },
    estadoNascimento: {
      type: 'string'
    },
    cidadeNascimento: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    nomePai: {
      type: 'string'
    },
    nomeMae: {
      type: 'string'
    }
  }
}
