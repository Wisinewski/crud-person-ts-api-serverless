import { AddPersonParams } from './../../../../domain/usecases/add-person';
import { AddPersonRepository } from './../../../../data/protocols/db/add-person-repository';
import { PersonModel } from './../../../../domain/models/person';
import { LoadPersonByIdRepository } from './../../../../data/protocols/db/load-person-by-id-repository';

export class PersonDynamoRepositorySpy implements LoadPersonByIdRepository, AddPersonRepository {
  data: any
  result: any
  async loadById (id: string): Promise<PersonModel> { 
    this.data = id
    return this.result
  }

  async add (personData: AddPersonParams): Promise<PersonModel> {
    this.data = personData
    return this.result
  }
}