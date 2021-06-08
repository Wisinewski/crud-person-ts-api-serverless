import { mockPersonModel } from './../../../domain/test/mock-person';
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
      const personParams = mockPersonModel()
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
      const personParams = mockPersonModel()
      const person = await personDynamoRepositorySpy.loadById(personParams.id)
      expect(person).toBeFalsy()
    });
  });

  describe('add', () => {
    test('should return a person on add success', async () => {
      const { personDynamoRepositorySpy } = makeSut()
      personDynamoRepositorySpy.result = mockPersonModel()
      const personParams = mockPersonModel()
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

  describe('updateById', () => {
    test('should update a person on updateById success', async () => {
      const { personDynamoRepositorySpy } = makeSut()
      const person = mockPersonModel()
      const email = 'other_email@email.com'
      person.email = email
      personDynamoRepositorySpy.result = person
      const updatedPerson = await personDynamoRepositorySpy.updateById(person)
      expect(updatedPerson).toBeTruthy()
      expect(updatedPerson.email).toBe(email)
    });

    test('should return null if updateById fails', async () => {
      const { personDynamoRepositorySpy } = makeSut()
      const person = mockPersonModel()
      person.id = 'any_id'
      personDynamoRepositorySpy.result = null
      const updatedPerson = await personDynamoRepositorySpy.updateById(person)
      expect(updatedPerson).toBeFalsy()
    });
  });

  describe('loadByFilter', () => {
    test('should return all persons', async () => {
      const { personDynamoRepositorySpy } = makeSut()
      personDynamoRepositorySpy.result = [mockPersonModel(), mockPersonModel()]
      const persons = await personDynamoRepositorySpy.loadByFilter({})
      expect(persons.length).toBe(2)
      expect(persons[0].id).toBeTruthy()
      expect(persons[1].id).toBeTruthy()
    });
});