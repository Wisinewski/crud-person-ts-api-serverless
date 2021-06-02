import { DbUpdatePersonById } from './../../../../data/usecases/update-person-by-id/db-update-person-by-id';
import { PersonMongoRepository } from './../../../../infra/db/mongodb/person-mongo-repository';
import { UpdatePersonById } from './../../../../domain/usecases/update-person-by-id';

export const makeDbUpdatePersonById = (): UpdatePersonById => {
  const personMongoRepository = new PersonMongoRepository()
  return new DbUpdatePersonById(personMongoRepository)
}