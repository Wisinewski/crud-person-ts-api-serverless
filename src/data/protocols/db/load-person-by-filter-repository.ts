import { PersonModel } from './../../../domain/models/person';
import { FilterPersonParams } from './../../../domain/usecases/load-person-by-filter';

export interface LoadPersonByFilterRepository {
  loadByFilter: (params: FilterPersonParams) => Promise<PersonModel[]>
}