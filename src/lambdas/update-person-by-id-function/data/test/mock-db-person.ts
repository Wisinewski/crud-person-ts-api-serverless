import { mockPersonModel } from './../../domain/test/mock-person';
import { UpdatePersonParams } from './../../domain/usecases/update-person-by-id';
import { UpdatePersonByIdRepository } from './../protocols/db/update-person-by-id-repository';
import { PersonModel } from './../../domain/models/person';

export class UpdatePersonByIdRepositorySpy implements UpdatePersonByIdRepository {
  person: UpdatePersonParams
  result: PersonModel = mockPersonModel()
  async updateById (person: UpdatePersonParams): Promise<PersonModel> {
    this.person = person
    return this.result
  }
}