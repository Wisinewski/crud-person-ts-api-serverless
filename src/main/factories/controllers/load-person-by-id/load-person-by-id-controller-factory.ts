import { makeLoadPersonByIdValidation } from './load-person-by-id-validation-factory';
import { makeDbLoadPersonById } from './../../usecases/load-person-by-id/db-load-person-by-id';
import { LoadPersonByIdController } from './../../../../presentation/controllers/load-person-by-id/load-person-by-id-controller';

export const makeLoadPersonByIdController = (): LoadPersonByIdController => {
  const loadPersonByIdController = new LoadPersonByIdController(makeLoadPersonByIdValidation(), makeDbLoadPersonById())
  return loadPersonByIdController
}