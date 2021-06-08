import { mockAddPersonParams, mockPersonModel } from './../../../domain/test/mock-person';
import { PersonDynamoRepositorySpy } from './test/mock-dynamo-repository';

type SutTypes = {
  personDynamoRepositorySpy: PersonDynamoRepositorySpy
}

const makeSut = (): SutTypes => {
  const personDynamoRepositorySpy = new PersonDynamoRepositorySpy()
  return {
    personDynamoRepositorySpy
  }
}

describe('PersonDynamoRepository', () => {
  describe('loadById', () => {
    test('should return a person on loadById success', async () => {
      const { personDynamoRepositorySpy } = makeSut()
      personDynamoRepositorySpy.result = mockPersonModel()
      const personParams = mockAddPersonParams()
      const person = await personDynamoRepositorySpy.loadById(personParams.id)
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
    });

    test('should return null if loadByCpf fails', async () => {
      const { personDynamoRepositorySpy } = makeSut()
      personDynamoRepositorySpy.result = null
      const personParams = mockAddPersonParams()
      const person = await personDynamoRepositorySpy.loadById(personParams.id)
      expect(person).toBeFalsy()
    });
  });

  describe('add', () => {
    test('should return a person on add success', async () => {
      const { personDynamoRepositorySpy } = makeSut()
      personDynamoRepositorySpy.result = mockPersonModel()
      const personParams = mockAddPersonParams()
      const person = await personDynamoRepositorySpy.add(personParams)
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
    });
  });

  describe('deleteById', () => {
    test('should not return a person on deleteById success', async () => {
      const { personDynamoRepositorySpy } = makeSut()
      const person = mockPersonModel()
      await personDynamoRepositorySpy.deleteById(person.id)
      personDynamoRepositorySpy.result = null
      const deletedPerson = await personDynamoRepositorySpy.loadById(person.id)
      expect(deletedPerson).toBe(null)
    });
  });
});