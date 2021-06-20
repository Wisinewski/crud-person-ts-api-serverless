import { PersonModel } from '../../../domain/models/person';
import { UpdatePersonParams } from './../../../domain/usecases/update-person-by-id';

export interface UpdatePersonByIdRepository {
  updateById: (personData: UpdatePersonParams) => Promise<PersonModel>
}