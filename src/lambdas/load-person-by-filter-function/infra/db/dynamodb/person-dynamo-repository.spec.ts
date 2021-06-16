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

  describe('loadByFilter', () => {
    test('should return all persons', async () => {
      const { sut, mockPersonRepository } = makeSut()
      const personParams = mockPersonModel()
      await mockPersonRepository.addPerson(personParams)
      const persons = await sut.loadByFilter({})
      expect(persons.length).toBe(1)
      expect(persons[0].id).toBeTruthy()
      const success = await mockPersonRepository.deletePerson(personParams.id)
      expect(success).toBeTruthy()
    });

    test('should return just one person if receives a param', async () => {
      const { sut, mockPersonRepository } = makeSut()
      const personParams = mockPersonModel()
      await mockPersonRepository.addPerson(personParams)
      const params = {}
      params['nome'] = 'any_nome'
      params['cpf'] = 'any_cpf'
      params['dataNascimento'] = '2021-01-01'
      params['paisNascimento'] = 'any_paisNascimento',
      params['estadoNascimento'] = 'any_estadoNascimento',
      params['cidadeNascimento'] = 'any_cidadeNascimento'
      const persons = await sut.loadByFilter(params)
      expect(persons.length).toBe(1)
      expect(persons[0].id).toBeTruthy()
      const success = await mockPersonRepository.deletePerson(personParams.id)
      expect(success).toBeTruthy()
    });

    test('should return an empty list if no person matches with the received param', async () => {
      const { sut, mockPersonRepository } = makeSut()
      const personParams = mockPersonModel()
      await mockPersonRepository.addPerson(personParams)
      const persons = await sut.loadByFilter({ nome: 'other_nome' })
      expect(persons.length).toBe(0)
    });
  });
});