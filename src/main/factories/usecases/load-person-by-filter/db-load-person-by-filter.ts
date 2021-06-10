import { PersonDynamoRepository } from './../../../../infra/db/dynamodb/person-dynamo-repository';
import { DbLoadPersonByFilter } from './../../../../data/usecases/load-person-by-filter/db-load-person-by-filter';
import { LoadPersonByFilter } from './../../../../domain/usecases/load-person-by-filter';

export const makeDbLoadPersonByFilter = (): LoadPersonByFilter => {
  const personDynamoRepository = new PersonDynamoRepository()
  return new DbLoadPersonByFilter(personDynamoRepository)
}