import { MongoIdValidatorAdapter } from './../../../../infra/validators/mongo-id-validator-adapter';
import { MongoIdValidation } from './../../../../validation/validators/mongo-id-validation';
import { Validation } from './../../../../presentation/protocols/validation';
import { ValidationComposite } from './../../../../validation/validators/validation-composite';

export const makeLoadPersonByIdValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new MongoIdValidation('id', new MongoIdValidatorAdapter()))
  return new ValidationComposite(validations)
}