import { PersonDynamoRepository } from './../../../../infra/db/dynamodb/person-dynamo-repository';
import { DbDeletePersonById } from './../../../../data/usecases/delete-person-by-id/db-delete-person-by-id';
import { DeletePersonById } from './../../../../domain/usecases/delete-person-by-id';

export const makeDbDeletePersonById = (): DeletePersonById => {
  const personDynamoRepository = new PersonDynamoRepository()
  return new DbDeletePersonById(personDynamoRepository)
}