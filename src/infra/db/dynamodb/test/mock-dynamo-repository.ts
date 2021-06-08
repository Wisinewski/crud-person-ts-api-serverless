import { UpdatePersonParams } from './../../../../domain/usecases/update-person-by-id';
import { UpdatePersonByIdRepository } from './../../../../data/protocols/db/update-person-by-id-repository';
import { DeletePersonByIdRepository } from './../../../../data/protocols/db/delete-person-by-id-repository';
import { AddPersonParams } from './../../../../domain/usecases/add-person';
import { AddPersonRepository } from './../../../../data/protocols/db/add-person-repository';
import { PersonModel } from './../../../../domain/models/person';
import { LoadPersonByIdRepository } from './../../../../data/protocols/db/load-person-by-id-repository';

export class PersonDynamoRepositorySpy implements LoadPersonByIdRepository, AddPersonRepository, DeletePersonByIdRepository, UpdatePersonByIdRepository {
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

  async deleteById (id: string): Promise<boolean> {
    this.data = id
    return this.result
  }

  async updateById (personData: UpdatePersonParams): Promise<PersonModel> {
    this.data = personData
    return this.result
  }
}