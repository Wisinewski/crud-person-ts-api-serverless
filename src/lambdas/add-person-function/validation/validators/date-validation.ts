import { InvalidParamError } from './../../presentation/errors/invalid-param-error';
import { DateValidator } from './../protocols/date-validator';
import { Validation } from './../../presentation/protocols/validation';

export class DateValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly dateValidator: DateValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.dateValidator.isValid(input[this.field])
    if (!isValid) {
      return new InvalidParamError(this.field)
    }
  }
}