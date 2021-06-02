import { makeDbDeletePersonById } from '../../usecases/delete-person-by-id/db-delete-person-by-id';
import { DeletePersonByIdController } from './../../../../presentation/controllers/delete-person-by-id/delete-person-by-id-controller';
import { makeDeletePersonByIdValidation } from './delete-person-by-id-validation-factory';

export const makeDeletePersonByIdController = (): DeletePersonByIdController => {
  const deletePersonByIdController = new DeletePersonByIdController(makeDeletePersonByIdValidation(), makeDbDeletePersonById())
  return deletePersonByIdController
}