import { InvalidParamError } from './../../presentation/errors/invalid-param-error';
import { MongoIdValidator } from './../protocols/mongo-id-validator';
import { Validation } from './../../presentation/protocols/validation';

export class MongoIdValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly mongoIdValidator: MongoIdValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.mongoIdValidator.isValid(input[this.field])
    if (!isValid) {
      return new InvalidParamError(this.field)
    }
  }
}