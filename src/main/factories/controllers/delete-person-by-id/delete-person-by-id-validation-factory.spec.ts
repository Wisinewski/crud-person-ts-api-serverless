import { MongoIdValidation } from './../../../../validation/validators/mongo-id-validation';
import { ValidationComposite } from './../../../../validation/validators/validation-composite';
import { Validation } from './../../../../presentation/protocols/validation';
import { makeDeletePersonByIdValidation } from './delete-person-by-id-validation-factory';

jest.mock('../../../../validation/validators/validation-composite')

describe('DeletePersonByIdValidationFactory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeDeletePersonByIdValidation()
    const validations: Validation[] = []
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  });
});