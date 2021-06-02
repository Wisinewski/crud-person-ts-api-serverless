import { DbDeletePersonById } from './../../../../data/usecases/delete-person-by-id/db-delete-person-by-id';
import { PersonMongoRepository } from './../../../../infra/db/mongodb/person-mongo-repository';
import { DeletePersonById } from './../../../../domain/usecases/delete-person-by-id';

export const makeDbDeletePersonById = (): DeletePersonById => {
  const personMongoRepository = new PersonMongoRepository()
  return new DbDeletePersonById(personMongoRepository)
}