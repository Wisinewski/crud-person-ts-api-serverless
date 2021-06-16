import { CpfValidator } from '../../validation/protocols/cpf-validator';
import { cpf } from 'cpf-cnpj-validator';

export class CpfValidatorAdapter implements CpfValidator {
  isValid (value: string): boolean {
    //return true
    return cpf.isValid(value)
  }
}