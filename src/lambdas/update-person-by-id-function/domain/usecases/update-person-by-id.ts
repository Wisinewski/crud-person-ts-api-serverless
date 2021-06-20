import { PersonModel } from './../models/person';

export type UpdatePersonParams = Omit<PersonModel, 'cpf'>

export interface UpdatePersonById {
  update: (person: UpdatePersonParams) => Promise<PersonModel>
}