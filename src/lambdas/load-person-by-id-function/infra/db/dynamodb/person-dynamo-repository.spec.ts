import { DynamoDB } from 'aws-sdk';
import { MockPersonRepository } from './test/mock-person-repository';
import { PersonDynamoRepository } from './person-dynamo-repository';
import { mockPersonModel } from './../../../domain/test/mock-person';

type SutTypes = {
  sut: PersonDynamoRepository
  mockPersonRepository: MockPersonRepository
}

const makeSut = (): SutTypes => {
  const sut = new PersonDynamoRepository()
  const mockPersonRepository = new MockPersonRepository(sut.dynamoHelper)
  return {
    sut,
    mockPersonRepository
  }
}

let docClient: DynamoDB.DocumentClient

describe('PersonDynamoRepository', () => {
  beforeAll(async () => {
    docClient = new DynamoDB.DocumentClient({
      convertEmptyValues: true,
      ...(process.env.JEST_WORKER_ID && {
        endpoint: 'localhost:8000',
        sslEnabled: false,
        region: 'local-env'
      })
    })
  })

  describe('loadById', () => {
    test('should return a person on loadById success', async () => {
      const { sut, mockPersonRepository } = makeSut()
      const personParams = mockPersonModel()
      await mockPersonRepository.addPerson(personParams)
      const person = await sut.loadById(personParams.id)
      expect(person).toBeTruthy()
      expect(person.id).toBeTruthy()
      expect(person.nome).toBe(personParams.nome)
      expect(person.email).toBe(personParams.email)
      expect(person.cpf).toBe(personParams.cpf)
      expect(person.dataNascimento).toEqual(personParams.dataNascimento)
      expect(person.paisNascimento).toBe(personParams.paisNascimento)
      expect(person.estadoNascimento).toBe(personParams.estadoNascimento)
      expect(person.cidadeNascimento).toBe(personParams.cidadeNascimento)
      expect(person.nomeMae).toBe(personParams.nomeMae)
      expect(person.nomePai).toBe(personParams.nomePai)
      const success = await mockPersonRepository.deletePerson(personParams.id)
      expect(success).toBeTruthy()
    });

    test('should return null if loadByCpf fails', async () => {
      const { sut } = makeSut()
      const personParams = mockPersonModel()
      const person = await sut.loadById(personParams.id)
      expect(person).toBeFalsy()
    });
  });
});