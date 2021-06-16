import { CpfValidator } from './../protocols/cpf-validator';
import { Validation } from './../../presentation/protocols/validation';
import { InvalidParamError } from './../../presentation/errors/invalid-param-error';

export class CpfValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly cpfValidator: CpfValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.cpfValidator.isValid(input[this.field])
    if (!isValid) {
      return new InvalidParamError(this.field)
    }
  }
}