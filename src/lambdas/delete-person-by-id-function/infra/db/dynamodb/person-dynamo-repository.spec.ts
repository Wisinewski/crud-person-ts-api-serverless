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

  describe('deleteById', () => {
    test('should not return a person on deleteById success', async () => {
      const { sut, mockPersonRepository } = makeSut()
      const personParams = mockPersonModel()
      await mockPersonRepository.addPerson(personParams)
      await sut.deleteById(personParams.id)
      const dbParams: DynamoDB.DocumentClient.GetItemInput = {
        TableName: 'PersonsTable',
        Key: {
          id: personParams.id
        }
      }
      const result: DynamoDB.DocumentClient.GetItemOutput = await docClient.get(dbParams).promise()
      const deletedPerson = result.Item
      expect(deletedPerson).toBeFalsy()
    });
  });
});