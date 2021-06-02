import { MongoIdValidatorAdapter } from './../../../../infra/validators/mongo-id-validator-adapter';
import { MongoIdValidation } from './../../../../validation/validators/mongo-id-validation';
import { makeUpdatePersonByIdValidation } from './update-person-by-id-validation-factory';
import { Validation } from './../../../../presentation/protocols/validation';
import { ValidationComposite } from './../../../../validation/validators/validation-composite';
import { EmailValidatorAdapter } from './../../../../infra/validators/email-validator-adapter';
import { EmailValidation } from './../../../../validation/validators/email-validation';
import { RequiredFieldValidation } from './../../../../validation/validators/required-field-validation';

jest.mock('../../../../validation/validators/validation-composite')

describe('UpdatePersonByIdValidationFactory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeUpdatePersonByIdValidation()
    const validations: Validation[] = []
    validations.push(new MongoIdValidation('id', new MongoIdValidatorAdapter()))
    for (const field of ['nome', 'dataNascimento', 'paisNascimento', 'estadoNascimento', 'cidadeNascimento', 'email']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  });
});