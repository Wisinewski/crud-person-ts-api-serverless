import { PersonModel } from './../../../domain/models/person';
import { FilterPersonParams } from './../../../domain/usecases/load-person-by-filter';
import { LoadPersonByFilterRepository } from './../../../data/protocols/db/load-person-by-filter-repository';
import { UpdatePersonParams } from './../../../domain/usecases/update-person-by-id';
import { UpdatePersonByIdRepository } from './../../../data/protocols/db/update-person-by-id-repository';
import { AddPersonParams } from './../../../domain/usecases/add-person';
import { AddPersonRepository } from './../../../data/protocols/db/add-person-repository';
import { MongoHelper } from './helpers/mongo-helper';
import { LoadPersonByCpfRepository } from '../../../data/protocols/db/load-person-by-cpf-repository';
import { DeletePersonByIdRepository } from '../../../data/protocols/db/delete-person-by-id-repository';
import { ObjectId } from 'bson';

export class PersonMongoRepository implements LoadPersonByCpfRepository, AddPersonRepository, DeletePersonByIdRepository, UpdatePersonByIdRepository, LoadPersonByFilterRepository {
  async loadByCpf (cpf: string): Promise<PersonModel> {
    const personCollection = await MongoHelper.getCollection('persons')
    const person = await personCollection.findOne({ cpf })
    return person && MongoHelper.map(person)
  }

  async add (personData: AddPersonParams): Promise<PersonModel> {
    const personCollection = await MongoHelper.getCollection('persons')
    const result = await personCollection.insertOne(personData)
    const person = result.ops[0]
    return MongoHelper.map(person)
  }

  async deleteById (id: string): Promise<boolean> {
    const personCollection = await MongoHelper.getCollection('persons')
    const response = await personCollection.deleteOne({ _id: new ObjectId(id) })
    return response.result.n === 1
  }

  async updateById (personData: UpdatePersonParams): Promise<PersonModel> {
    const personCollection = await MongoHelper.getCollection('persons')
    const person = await personCollection.findOneAndUpdate({
      _id: new ObjectId(personData.id)
    }, {
      $set: {
        nome: personData.nome,
        dataNascimento: personData.dataNascimento,
        paisNascimento: personData.paisNascimento,
        estadoNascimento: personData.estadoNascimento,
        cidadeNascimento: personData.cidadeNascimento,
        email: personData.email,
        nomePai: personData.nomePai,
        nomeMae: personData.nomeMae
      }
    }, {
      returnOriginal: false,
      upsert: false
    })
    return person.value ? MongoHelper.map(person.value) : null
  }

  async loadByFilter (params: FilterPersonParams): Promise<PersonModel[]> {
    const personCollection = await MongoHelper.getCollection('persons')
    const persons = await personCollection.find(params).toArray()
    return MongoHelper.mapCollection(persons)
  }

  async loadById (id: string): Promise<PersonModel> {
    const personCollection = await MongoHelper.getCollection('persons')
    const person = await personCollection.findOne({ _id: new ObjectId(id) })
    return person && MongoHelper.map(person)
  }
}