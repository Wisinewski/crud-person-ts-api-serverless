import validator from 'validator';
import { DateValidator } from './../../validation/protocols/date-validator';

export class DateValidatorAdapter implements DateValidator {
  isValid (date: string): boolean {
    return validator.isISO8601(date)
  }
}