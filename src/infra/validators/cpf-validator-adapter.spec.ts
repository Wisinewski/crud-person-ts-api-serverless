import { CpfValidatorAdapter } from './cpf-validator-adapter';
import { cpf } from 'cpf-cnpj-validator'

jest.spyOn(cpf, 'isValid').mockReturnValueOnce(true)

type SutTypes = {
  sut: CpfValidatorAdapter
}

const makeSut = (): SutTypes => {
  const sut = new CpfValidatorAdapter()
  return {
    sut
  }
}

describe('CpfValidatorAdapter', () => {
  test('should call cpf-cnpj-validator with correct value', () => {
    const { sut } = makeSut()
    const isCpfSpy = jest.spyOn(cpf, 'isValid')
    const input = 'any_cpf'
    sut.isValid(input)
    expect(isCpfSpy).toHaveBeenCalledWith(input)
  });

  test('should return false if validator returns false', () => {
    const { sut } = makeSut()
    jest.spyOn(cpf, 'isValid').mockReturnValueOnce(false)
    const isValid = sut.isValid('any_cpf')
    expect(isValid).toBe(false)
  });

  test('should return true if validator returns true', () => {
    const { sut } = makeSut()
    jest.spyOn(cpf, 'isValid').mockReturnValueOnce(true)
    const isValid = sut.isValid('any_id')
    expect(isValid).toBe(true)
  });
});