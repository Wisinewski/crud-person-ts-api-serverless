import { MissingParamError } from './../../presentation/errors/missing-param-error';
import { Validation } from './../../presentation/protocols/validation';

export class RequiredFieldValidation implements Validation {
  constructor (
    private readonly field: string
  ) {}

  validate (input: any): Error {
    if (!input[this.field]) {
      return new MissingParamError(this.field)
    }
  }
}