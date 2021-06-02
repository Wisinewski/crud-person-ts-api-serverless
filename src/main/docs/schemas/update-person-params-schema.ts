export const updatePersonByIdParamsSchema = {
  type: 'object',
  properties: {
    nome: {
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
  required: ['id', 'nome', 'dataNascimento', 'paisNascimento', 'estadoNascimento', 'cidadeNascimento', 'email', 'nomePai', 'nomeMae']
}