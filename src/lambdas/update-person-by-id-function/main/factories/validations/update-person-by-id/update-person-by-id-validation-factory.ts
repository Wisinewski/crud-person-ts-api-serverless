import { EmailValidatorAdapter } from './../../../../infra/validators/email-validator-adapter';
import { EmailValidation } from './../../../../validation/validators/email-validation';
import { RequiredFieldValidation } from './../../../../validation/validators/required-field-validation';
import { Validation } from './../../../../presentation/protocols/validation';
import { ValidationComposite } from './../../../../validation/validators/validation-composite';

export const makeUpdatePersonByIdValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['nome', 'dataNascimento', 'paisNascimento', 'estadoNascimento', 'cidadeNascimento', 'email']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}