import { PersonDynamoRepository } from './../../../../infra/db/dynamodb/person-dynamo-repository';
import { DbLoadPersonById } from '../../../../data/usecases/load-person-by-id/db-load-person-by-id';
import { LoadPersonById } from '../../../../domain/usecases/load-person-by-id';

export const makeDbLoadPersonById = (): LoadPersonById => {
  const table = process.env['PERSONS_TABLE']
  const personDynamoRepository = new PersonDynamoRepository(table)
  return new DbLoadPersonById(personDynamoRepository)
}