import { PersonDynamoRepository } from './../../../../infra/db/dynamodb/person-dynamo-repository';
import { DbUpdatePersonById } from './../../../../data/usecases/update-person-by-id/db-update-person-by-id';
import { UpdatePersonById } from './../../../../domain/usecases/update-person-by-id';

export const makeDbUpdatePersonById = (): UpdatePersonById => {
  const personDynamoRepository = new PersonDynamoRepository(process.env['PERSONS_TABLE'])
  return new DbUpdatePersonById(personDynamoRepository)
}