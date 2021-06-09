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

  describe('add', () => {
    test('should return a person on add success', async () => {
      const { sut, mockPersonRepository } = makeSut()
      const personParams = mockPersonModel()
      const person = await sut.add(personParams)
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
  });

  describe('deleteById', () => {
    test('should not return a person on deleteById success', async () => {
      const { sut, mockPersonRepository } = makeSut()
      const personParams = mockPersonModel()
      await mockPersonRepository.addPerson(personParams)
      await sut.deleteById(personParams.id)
      const deletedPerson = await sut.loadById(personParams.id)
      expect(deletedPerson).toBeFalsy()
    });
  });

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
      const success = await mockPersonRepository.deletePerson(personParams.id)
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

  describe('loadByCpf', () => {
    test('should return a person on loadByCpf success', async () => {
      const { sut, mockPersonRepository } = makeSut()
      const personParams = mockPersonModel()
      await mockPersonRepository.addPerson(personParams)
      const person = await sut.loadByCpf(personParams.cpf)
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
      const person = await sut.loadByCpf(personParams.cpf)
      expect(person).toBeFalsy()
    });
  });
});