import { DateValidatorAdapter } from './../../../../infra/validators/date-validator-adapter';
import { DateValidation } from './../../../../validation/validators/date-validation';
import { CpfValidatorAdapter } from './../../../../infra/validators/cpf-validator-adapter';
import { EmailValidatorAdapter } from './../../../../infra/validators/email-validator-adapter';
import { CpfValidation } from './../../../../validation/validators/cpf-validation';
import { EmailValidation } from './../../../../validation/validators/email-validation';
import { RequiredFieldValidation } from './../../../../validation/validators/required-field-validation';
import { Validation } from './../../../../presentation/protocols/validation';
import { ValidationComposite } from './../../../../validation/validators/validation-composite';

export const makeAddPersonValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['nome', 'cpf', 'dataNascimento', 'paisNascimento', 'estadoNascimento', 'cidadeNascimento', 'email']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CpfValidation('cpf', new CpfValidatorAdapter()))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  validations.push(new DateValidation('dataNascimento', new DateValidatorAdapter()))
  return new ValidationComposite(validations)
}