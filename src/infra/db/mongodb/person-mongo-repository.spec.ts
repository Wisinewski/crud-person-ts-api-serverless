import { mockAddPersonParams, mockUpdatePersonParams } from './../../../domain/test/mock-person';
import { Collection, ObjectId } from 'mongodb';
import { MongoHelper } from './helpers/mongo-helper';
import { PersonMongoRepository } from './person-mongo-repository';

type SutTypes = {
  sut: PersonMongoRepository
}

const makeSut = (): SutTypes => {
  const sut = new PersonMongoRepository()
  return {
    sut
  }
}

let personCollection: Collection

describe('PersonMongoRepository', () => {
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

  describe('loadByCpf', () => {
    test('should return a person on loadByCpf success', async () => {
      const { sut } = makeSut()
      const personParams = mockAddPersonParams()
      await personCollection.insertOne(personParams)
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
    });

    test('should return null if loadByCpf fails', async () => {
      const { sut } = makeSut()
      const personParams = mockAddPersonParams()
      const person = await sut.loadByCpf(personParams.cpf)
      expect(person).toBeFalsy()
    });
  });

  describe('add', () => {
    test('should return a person on add success', async () => {
      const { sut } = makeSut()
      const personParams = mockAddPersonParams()
      const person = await sut.add(personParams)
      expect(person).toBeTruthy()
      expect(person.id).toBeTruthy()
      expect(person.nome).toBe(personParams.nome)
      expect(person.email).toBe(personParams.email)
      expect(person.cpf).toBe(personParams.cpf)
      expect(person.dataNascimento).toBe(personParams.dataNascimento)
      expect(person.paisNascimento).toBe(personParams.paisNascimento)
      expect(person.estadoNascimento).toBe(personParams.estadoNascimento)
      expect(person.cidadeNascimento).toBe(personParams.cidadeNascimento)
      expect(person.nomeMae).toBe(personParams.nomeMae)
      expect(person.nomePai).toBe(personParams.nomePai)
    });
  });

  describe('deleteById', () => {
    test('should not return a person on deleteById success', async () => {
      const { sut } = makeSut()
      const result = await personCollection.insertOne(mockAddPersonParams())
      const person = MongoHelper.map(result.ops[0])
      await sut.deleteById(person.id)
      const deletedPerson = await personCollection.findOne({ _id: new ObjectId(person.id) })
      expect(deletedPerson).toBe(null)
    });
  });

  describe('updateById', () => {
    test('should update a person on updateById success', async () => {
      const { sut } = makeSut()
      const personData = mockAddPersonParams()
      const result = await personCollection.insertOne(personData)
      const person = MongoHelper.map(result.ops[0])
      const email = 'other_email@email.com'
      person.email = email
      const updatedPerson = await sut.updateById(person)
      expect(updatedPerson).toBeTruthy()
      expect(updatedPerson.email).toBe(email)
    });

    test('should return null if updateById fails', async () => {
      const { sut } = makeSut()
      const personData = mockUpdatePersonParams()
      personData.id = '60abe8aa6be4e84740d7f1d4'
      const updatedPerson = await sut.updateById(personData)
      expect(updatedPerson).toBeFalsy()
    });
  });

  describe('loadByFilter', () => {
    test('should return all persons', async () => {
      await personCollection.insertMany([{
        nome: 'any_nome',
        cpf: 'any_cpf',
        dataNascimento: 'any_dataNascimento',
        paisNascimento: 'any_paisNascimento',
        estadoNascimento: 'any_estadoNascimento',
        cidadeNascimento: 'any_cidadeNascimento',
        email: 'any_emailNascimento',
        nomePai: 'any_nomePai',
        nomeMae: 'any_nomeMae'
      }, {
        nome: 'other_nome',
        cpf: 'other_cpf',
        dataNascimento: 'other_dataNascimento',
        paisNascimento: 'other_paisNascimento',
        estadoNascimento: 'other_estadoNascimento',
        cidadeNascimento: 'other_cidadeNascimento',
        email: 'other_emailNascimento',
        nomePai: 'other_nomePai',
        nomeMae: 'other_nomeMae'
      }])
      const { sut } = makeSut()
      const persons = await sut.loadByFilter({})
      expect(persons.length).toBe(2)
      expect(persons[0].id).toBeTruthy()
      expect(persons[1].id).toBeTruthy()
    });

    test('should return just one person if receives a param', async () => {
      await personCollection.insertMany([{
        nome: 'any_nome',
        cpf: 'any_cpf',
        dataNascimento: 'any_dataNascimento',
        paisNascimento: 'any_paisNascimento',
        estadoNascimento: 'any_estadoNascimento',
        cidadeNascimento: 'any_cidadeNascimento',
        email: 'any_emailNascimento',
        nomePai: 'any_nomePai',
        nomeMae: 'any_nomeMae'
      }, {
        nome: 'other_nome',
        cpf: 'other_cpf',
        dataNascimento: 'other_dataNascimento',
        paisNascimento: 'other_paisNascimento',
        estadoNascimento: 'other_estadoNascimento',
        cidadeNascimento: 'other_cidadeNascimento',
        email: 'other_emailNascimento',
        nomePai: 'other_nomePai',
        nomeMae: 'other_nomeMae'
      }])
      const { sut } = makeSut()
      const params = {}
      params['nome'] = 'any_nome'
      const persons = await sut.loadByFilter(params)
      expect(persons.length).toBe(1)
      expect(persons[0].id).toBeTruthy()
    });

    test('should return an empty list if no person matches with the received param', async () => {
      await personCollection.insertMany([{
        nome: 'any_nome',
        cpf: 'any_cpf',
        dataNascimento: 'any_dataNascimento',
        paisNascimento: 'any_paisNascimento',
        estadoNascimento: 'any_estadoNascimento',
        cidadeNascimento: 'any_cidadeNascimento',
        email: 'any_emailNascimento',
        nomePai: 'any_nomePai',
        nomeMae: 'any_nomeMae'
      }])
      const { sut } = makeSut()
      const persons = await sut.loadByFilter({ nome: 'other_nome' })
      expect(persons.length).toBe(0)
    });
  });

  describe('loadById', () => {
    test('should return a person on loadById success', async () => {
      const { sut } = makeSut()
      const personParams = mockAddPersonParams()
      const result = await personCollection.insertOne(personParams)
      const insertedPerson = MongoHelper.map(result.ops[0])
      const person = await sut.loadById(insertedPerson.id)
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

    test('should return null if loadById fails', async () => {
      const { sut } = makeSut()
      const person = await sut.loadById('60afd9407935cd45905e2ae6')
      expect(person).toBeFalsy()
    });
  });
});