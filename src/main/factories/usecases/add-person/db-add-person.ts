import { PersonMongoRepository } from './../../../../infra/db/mongodb/person-mongo-repository';
import { DbAddPerson } from './../../../../data/usecases/add-person/db-add-person';
import { AddPerson } from './../../../../domain/usecases/add-person';

export const makeDbAddPerson = (): AddPerson => {
  const personMongoRepository = new PersonMongoRepository()
  return new DbAddPerson(personMongoRepository, personMongoRepository)
}