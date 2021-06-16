import { PersonModel } from '../models/person';

export interface LoadPersonById {
  load: (id: string) => Promise<PersonModel>
}