import { PersonModel } from './../../../domain/models/person';
import { AddPersonParams } from './../../../domain/usecases/add-person';

export interface AddPersonRepository {
  add: (personData: AddPersonParams) => Promise<PersonModel>
}