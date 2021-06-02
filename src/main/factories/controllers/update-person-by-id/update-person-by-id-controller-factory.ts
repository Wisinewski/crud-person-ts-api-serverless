import { makeDbUpdatePersonById } from './../../usecases/update-person-by-id/db-update-person-by-id';
import { makeUpdatePersonByIdValidation } from './update-person-by-id-validation-factory';
import { UpdatePersonByIdController } from './../../../../presentation/controllers/update-person-by-id/update-person-by-id-controller';

export const makeUpdatePersonByIdController = (): UpdatePersonByIdController => {
  const updatePersonByIdController = new UpdatePersonByIdController(makeUpdatePersonByIdValidation(), makeDbUpdatePersonById())
  return updatePersonByIdController
}