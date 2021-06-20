import { Validation } from './../../presentation/protocols/validation';

export class ValidationSpy implements Validation {
  result: Error = null
  validate (input: any): Error {
    return this.result
  }
}