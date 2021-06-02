import { makeDbAddPerson } from './../../usecases/add-person/db-add-person';
import { makeAddPersonValidation } from './add-person-validation-factory';
import { AddPersonController } from './../../../../presentation/controllers/add-person/add-person-controller';

export const makeAddPersonController = (): AddPersonController => {
  const addPersonController = new AddPersonController(makeAddPersonValidation(), makeDbAddPerson())
  return addPersonController
}