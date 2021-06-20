import { LoadPersonById } from './../../domain/usecases/load-person-by-id';
import { mockPersonModel } from './../../domain/test/mock-person';
import { PersonModel } from './../../domain/models/person';

export class LoadPersonByIdSpy implements LoadPersonById {
  id: string
  result: PersonModel = mockPersonModel()
  async load (id: string): Promise<PersonModel> {
    this.id = id
    return this.result
  }
}