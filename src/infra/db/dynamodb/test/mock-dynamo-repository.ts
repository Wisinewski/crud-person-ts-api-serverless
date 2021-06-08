import { PersonModel } from './../../../../domain/models/person';
import { LoadPersonByIdRepository } from './../../../../data/protocols/db/load-person-by-id-repository';

export class PersonDynamoRepositorySpy implements LoadPersonByIdRepository {
  data: any
  result: any
  async loadById (id: string): Promise<PersonModel> { 
    this.data = id
    return this.result
  }
}