import { PersonModel } from './../models/person';

export type AddPersonParams = Omit<PersonModel, 'id'>

export interface AddPerson {
  add: (person: AddPersonParams) => Promise<PersonModel>
}