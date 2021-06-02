import { DbLoadPersonByFilter } from './../../../../data/usecases/load-person-by-filter/db-load-person-by-filter';
import { PersonMongoRepository } from './../../../../infra/db/mongodb/person-mongo-repository';
import { LoadPersonByFilter } from './../../../../domain/usecases/load-person-by-filter';

export const makeDbLoadPersonByFilter = (): LoadPersonByFilter => {
  const personMongoRepository = new PersonMongoRepository()
  return new DbLoadPersonByFilter(personMongoRepository)
}