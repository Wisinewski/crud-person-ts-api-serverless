export const personPath = {
  post: {
    tags: ['Pessoa'],
    summary: 'API para criar uma pessoa',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addPersonParams'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Criado',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/person'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      404: {
        $ref: '#/components/notFound'
      },
      409: {
        $ref: '#/components/conflict'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },

  get: {
    tags: ['Pessoa'],
    summary: 'API para consultar os dados de pessoas por filtro',
    parameters: [{
      in: 'query',
      name: 'nome',
      schema: {
        type: 'string'
      }
    }, {
      in: 'query',
      name: 'cpf',
      schema: {
        type: 'string'
      }
    }, {
      in: 'query',
      name: 'dataNascimento',
      schema: {
        type: 'string'
      }
    }, {
      in: 'query',
      name: 'paisNascimento',
      schema: {
        type: 'string'
      }
    }, {
      in: 'query',
      name: 'estadoNascimento',
      schema: {
        type: 'string'
      }
    }, {
      in: 'query',
      name: 'cidadeNascimento',
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              name: 'id',
              required: true,
              $ref: '#/schemas/persons'
            }
          }
        }
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}