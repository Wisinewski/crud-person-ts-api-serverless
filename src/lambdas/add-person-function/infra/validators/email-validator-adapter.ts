import validator from 'validator';
//import validator from 'validator';
import { EmailValidator } from './../../validation/protocols/email-validator';

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    //return true
    return validator.isEmail(email)
  }
}