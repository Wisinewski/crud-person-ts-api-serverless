export const addPersonParamsSchema = {
  type: 'object',
  properties: {
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
    },
  },
  required: ['nome', 'cpf', 'dataNascimento', 'paisNascimento', 'estadoNascimento', 'cidadeNascimento', 'email', 'nomePai', 'nomeMae']
}
