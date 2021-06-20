import { PersonModel } from '../../../domain/models/person';

export interface LoadPersonByIdRepository {
  loadById: (id: string) => Promise<PersonModel>
}