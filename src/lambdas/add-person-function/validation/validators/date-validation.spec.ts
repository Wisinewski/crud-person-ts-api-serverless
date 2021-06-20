import { DateValidatorSpy } from './../test/mock-date-validator';
import { DateValidation } from './date-validation';
import { InvalidParamError } from './../../presentation/errors/invalid-param-error';

type SutTypes = {
  sut: DateValidation
  dateValidatorSpy: DateValidatorSpy
}

const makeSut = (): SutTypes => {
  const dateValidatorSpy = new DateValidatorSpy()
  const sut = new DateValidation('dataNascimento', dateValidatorSpy)
  return {
    sut,
    dateValidatorSpy
  }
}

describe('EmailValidation', () => {
  test('should return an error if DateValidator returns false', async () => {
    const { sut, dateValidatorSpy } = makeSut()
    dateValidatorSpy.result = false
    const error = sut.validate({ dataNascimento: '2021-01-01' })
    expect(error).toEqual(new InvalidParamError('dataNascimento'))
  });

  test('should call DateValidator with correct value', async () => {
    const { sut, dateValidatorSpy } = makeSut()
    const dataNascimento = '2021-01-01'
    sut.validate({ dataNascimento })
    expect(dateValidatorSpy.date).toBe(dataNascimento)
  });
});