import { DateValidator } from './../protocols/date-validator';

export class DateValidatorSpy implements DateValidator {
  date: string
  result: boolean = true
  isValid (date: string): boolean {
    this.date = date
    return this.result
  }
}