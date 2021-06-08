import { MongoIdValidation } from './../../../../validation/validators/mongo-id-validation';
import { makeLoadPersonByIdValidation } from './load-person-by-id-validation-factory';
import { ValidationComposite } from './../../../../validation/validators/validation-composite';
import { Validation } from './../../../../presentation/protocols/validation';

jest.mock('../../../../validation/validators/validation-composite')

describe('LoadPersonByIdValidationFactory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoadPersonByIdValidation()
    const validations: Validation[] = []
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  });
});