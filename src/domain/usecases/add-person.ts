import { PersonModel } from './../models/person';

export type AddPersonParams = PersonModel

export interface AddPerson {
  add: (person: AddPersonParams) => Promise<PersonModel>
}