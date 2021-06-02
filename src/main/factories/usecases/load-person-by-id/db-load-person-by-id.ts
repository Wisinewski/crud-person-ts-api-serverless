import { DbLoadPersonById } from '../../../../data/usecases/load-person-by-id/db-load-person-by-id';
import { PersonMongoRepository } from '../../../../infra/db/mongodb/person-mongo-repository';
import { LoadPersonById } from '../../../../domain/usecases/load-person-by-id';

export const makeDbLoadPersonById = (): LoadPersonById => {
  const personMongoRepository = new PersonMongoRepository()
  return new DbLoadPersonById(personMongoRepository)
}