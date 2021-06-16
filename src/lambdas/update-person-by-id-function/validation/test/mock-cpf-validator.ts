import { CpfValidator } from './../protocols/cpf-validator';

export class CpfValidatorSpy implements CpfValidator {
  cpf: string
  result: boolean = true
  isValid (cpf: string): boolean {
    this.cpf = cpf
    return this.result
  }
}