import { EmailValidatorAdapter } from './email-validator-adapter';
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

type SutTypes = {
  sut: EmailValidatorAdapter
}

const makeSut = (): SutTypes => {
  const sut = new EmailValidatorAdapter()
  return {
    sut
  }
}

describe('EmailValidatorAdapter', () => {
  test('should call validator with correct value', () => {
    const { sut } = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@email.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@email.com')
  });
  
  test('should return false if validator returns false', () => {
    const { sut } = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('any_email@email.com')
    expect(isValid).toBe(false)
  });

  test('should return true if validator returns true', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('any_email@email.com')
    expect(isValid).toBe(true)
  });
});