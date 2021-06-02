import { EmailValidatorSpy } from './../test/mock-email-validator';
import { InvalidParamError } from './../../presentation/errors/invalid-param-error';
import { EmailValidation } from './email-validation';

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation('email', emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('EmailValidation', () => {
  test('should return an error if EmailValidator returns false', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.result = false
    const error = sut.validate({ email: 'any_email@email.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  });

  test('should call EmailValidator with correct value', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    const email = 'any_email@email.com'
    sut.validate({ email })
    expect(emailValidatorSpy.email).toBe(email)
  });
});