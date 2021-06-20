import { LoadPersonByIdRepository } from './../protocols/db/load-person-by-id-repository';
import { mockPersonModel } from './../../domain/test/mock-person';
import { PersonModel } from './../../domain/models/person';


export class LoadPersonByIdRepositorySpy implements LoadPersonByIdRepository {
  id: string
  result: PersonModel = mockPersonModel()
  async loadById (id: string): Promise<PersonModel> {
    this.id = id
    return this.result
  }
}