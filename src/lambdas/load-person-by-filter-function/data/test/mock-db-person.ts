import { mockPersonModel } from './../../domain/test/mock-person';
import { FilterPersonParams } from './../../domain/usecases/load-person-by-filter';
import { LoadPersonByFilterRepository } from './../protocols/db/load-person-by-filter-repository';
import { PersonModel } from './../../domain/models/person';

export class LoadPersonByFilterRepositorySpy implements LoadPersonByFilterRepository {
  params: FilterPersonParams
  result: PersonModel[] = [mockPersonModel(), mockPersonModel()]
  async loadByFilter (params: FilterPersonParams): Promise<PersonModel[]> {
    this.params = params
    return this.result
  }
}