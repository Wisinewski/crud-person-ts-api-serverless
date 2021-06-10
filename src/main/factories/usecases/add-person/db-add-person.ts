import { UuidGeneratorAdapter } from './../../../../infra/uuid/uuid-generator';
import { PersonDynamoRepository } from './../../../../infra/db/dynamodb/person-dynamo-repository';
import { DbAddPerson } from './../../../../data/usecases/add-person/db-add-person';
import { AddPerson } from './../../../../domain/usecases/add-person';

export const makeDbAddPerson = (): AddPerson => {
  const personDynamoRepository = new PersonDynamoRepository()
  const uuidGeneratorAdapter = new UuidGeneratorAdapter()
  return new DbAddPerson(personDynamoRepository, personDynamoRepository, uuidGeneratorAdapter)
}