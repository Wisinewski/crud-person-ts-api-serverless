import { mockAddPersonParams } from './../../domain/test/mock-person';
import request from 'supertest';
import { MongoHelper } from './../../infra/db/mongodb/helpers/mongo-helper';
import { Collection } from 'mongodb';
import app from '../config/app';

let personCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    personCollection = await MongoHelper.getCollection('persons')
    await personCollection.deleteMany({})
  })

  describe('POST /persons', () => {
    test('should return 400 on add person without a required field', async () => {
      await request(app)
        .post('/api/persons')
        .send({
          cpf: '71821165020',
          dataNascimento: '2021-01-01',
          paisNascimento: 'any_paisNascimento',
          estadoNascimento: 'any_estadoNascimento',
          cidadeNascimento: 'any_cidadeNascimento',
          email: 'any_email@email.com',
          nomePai: 'any_nomePai',
          nomeMae: 'any_nomeMae'
        })
        .expect(400)
    })

    test('should return 409 on add an existing person', async () => {
      await personCollection.insertOne({
        nome: 'any_nome',
        cpf: '71821165020',
        dataNascimento: '2021-01-01',
        paisNascimento: 'any_paisNascimento',
        estadoNascimento: 'any_estadoNascimento',
        cidadeNascimento: 'any_cidadeNascimento',
        email: 'any_email@email.com',
        nomePai: 'any_nomePai',
        nomeMae: 'any_nomeMae'
      })
      await request(app)
        .post('/api/persons')
        .send({
          nome: 'any_nome',
          cpf: '71821165020',
          dataNascimento: '2021-01-01',
          paisNascimento: 'any_paisNascimento',
          estadoNascimento: 'any_estadoNascimento',
          cidadeNascimento: 'any_cidadeNascimento',
          email: 'any_email@email.com',
          nomePai: 'any_nomePai',
          nomeMae: 'any_nomeMae'
        })
        .expect(409)
    })

    test('should return 201 on success', async () => {
      await request(app)
        .post('/api/persons')
        .send({
          nome: 'any_nome',
          cpf: '71821165020',
          dataNascimento: '2021-01-01',
          paisNascimento: 'any_paisNascimento',
          estadoNascimento: 'any_estadoNascimento',
          cidadeNascimento: 'any_cidadeNascimento',
          email: 'any_email@email.com',
          nomePai: 'any_nomePai',
          nomeMae: 'any_nomeMae'
        })
        .expect(201)
    })
  })

  describe('GET /persons', () => {
    test('should return 200 on success', async () => {
      await personCollection.insertOne({
        nome: 'any_nome',
        cpf: '71821165020',
        dataNascimento: '2021-01-01',
        paisNascimento: 'any_paisNascimento',
        estadoNascimento: 'any_estadoNascimento',
        cidadeNascimento: 'any_cidadeNascimento',
        email: 'any_email@email.com',
        nomePai: 'any_nomePai',
        nomeMae: 'any_nomeMae'
      })
      await request(app)
        .get('/api/persons')
        .send({})
        .expect(200)
    })
  })

  describe('GET /persons/:id', () => {
    test('should return 400 on get a person with an invalid mongo id', async () => {
      const id = 'any_id'
      await request(app)
        .get(`/api/persons/${id}`)
        .expect(400)
    });

    test('should return 404 on get an inexistent person with an valid id', async () => {
      const id = '60afd9407935cd45905e2ae2'
      await request(app)
        .get(`/api/persons/${id}`)
        .expect(404)
    });

    test('should return 200 on success', async () => {
      const result = await personCollection.insertOne({
        nome: 'any_nome',
        cpf: '71821165020',
        dataNascimento: '2021-01-01',
        paisNascimento: 'any_paisNascimento',
        estadoNascimento: 'any_estadoNascimento',
        cidadeNascimento: 'any_cidadeNascimento',
        email: 'any_email@email.com',
        nomePai: 'any_nomePai',
        nomeMae: 'any_nomeMae'
      })
      const person = result.ops[0]
      await request(app)
        .get(`/api/persons/${person._id}`)
        .expect(200)
    });
  });

  describe('PUT /persons', () => {
    test('should return 400 on update person with an invalid mongo id', async () => {
      const id = 'any_id'
      await request(app)
        .put(`/api/persons/${id}`)
        .send({
          nome: 'any_nome',
          cpf: 'invalid_cpf',
          dataNascimento: '2021-01-01',
          paisNascimento: 'any_paisNascimento',
          estadoNascimento: 'any_estadoNascimento',
          cidadeNascimento: 'any_cidadeNascimento',
          email: 'any_email@email.com',
          nomePai: 'any_nomePai',
          nomeMae: 'any_nomeMae'
        })
        .expect(400)
    });

    test('should return 404 on update an inexistent person with an valid id', async () => {
      const id = '60afd9407935cd45905e2ae2'
      await request(app)
        .put(`/api/persons/${id}`)
        .send({
          nome: 'any_nome',
          cpf: 'invalid_cpf',
          dataNascimento: '2021-01-01',
          paisNascimento: 'any_paisNascimento',
          estadoNascimento: 'any_estadoNascimento',
          cidadeNascimento: 'any_cidadeNascimento',
          email: 'any_email@email.com',
          nomePai: 'any_nomePai',
          nomeMae: 'any_nomeMae'
        })
        .expect(404)
    });

    test('should return 200 on success', async () => {
      const result = await personCollection.insertOne({
        nome: 'any_nome',
        cpf: '71821165020',
        dataNascimento: '2021-01-01',
        paisNascimento: 'any_paisNascimento',
        estadoNascimento: 'any_estadoNascimento',
        cidadeNascimento: 'any_cidadeNascimento',
        email: 'any_email@email.com',
        nomePai: 'any_nomePai',
        nomeMae: 'any_nomeMae'
      })
      const person = result.ops[0]
      await request(app)
        .put(`/api/persons/${person._id}`)
        .send({
          nome: 'other_nome',
          cpf: '71821165020',
          dataNascimento: '2021-01-01',
          paisNascimento: 'any_paisNascimento',
          estadoNascimento: 'any_estadoNascimento',
          cidadeNascimento: 'any_cidadeNascimento',
          email: 'any_email@email.com',
          nomePai: 'any_nomePai',
          nomeMae: 'any_nomeMae'
        })
        .expect(200)
    });
  });

  describe('DELETE /persons/:id', () => {
    test('should return 400 on delete person with an invalid mongo id', async () => {
      const id = 'any_id'
      await request(app)
        .delete(`/api/persons/${id}`)
        .expect(400)
    });

    test('should return 404 on delete an inexistent person with an valid mongo id', async () => {
      const id = '60afd9407935cd45905e2ae2'
      await request(app)
        .delete(`/api/persons/${id}`)
        .expect(404)
    });

    test('should return 204 on success', async () => {
      const result = await personCollection.insertOne({
        nome: 'any_nome',
        cpf: '71821165020',
        dataNascimento: '2021-01-01',
        paisNascimento: 'any_paisNascimento',
        estadoNascimento: 'any_estadoNascimento',
        cidadeNascimento: 'any_cidadeNascimento',
        email: 'any_email@email.com',
        nomePai: 'any_nomePai',
        nomeMae: 'any_nomeMae'
      })
      const person = result.ops[0]
      await request(app)
        .delete(`/api/persons/${person._id}`)
        .expect(204)
    });
  });
})