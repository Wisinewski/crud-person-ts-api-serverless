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

  describe('updateById', () => {
    test('should update a person on updateById success', async () => {
      const { sut, mockPersonRepository } = makeSut()
      const personParams = mockPersonModel()
      await mockPersonRepository.addPerson(personParams)
      const email = 'other_email@email.com'
      personParams.email = email
      const updatedPerson = await sut.updateById(personParams)
      expect(updatedPerson).toBeTruthy()
      expect(updatedPerson.email).toBe(email)
      const success = await mockPersonRepository.deletePerson(updatedPerson.id)
      expect(success).toBeTruthy()
    });

    test('should return null if updateById fails', async () => {
      const { sut } = makeSut()
      const person = mockPersonModel()
      person.id = 'any_id'
      const updatedPerson = await sut.updateById(person)
      expect(updatedPerson).toBeFalsy()
    });
  });
});