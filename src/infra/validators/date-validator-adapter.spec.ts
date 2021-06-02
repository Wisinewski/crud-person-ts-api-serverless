import validator from 'validator';
import { DateValidatorAdapter } from './date-validator-adapter';

jest.mock('validator', () => ({
  isISO8601 (): boolean {
    return true
  }
}))

type SutTypes = {
  sut: DateValidatorAdapter
}

const makeSut = (): SutTypes => {
  const sut = new DateValidatorAdapter()
  return {
    sut
  }
}

describe('DateValidatorAdapter', () => {
  test('should call validator with correct value', () => {
    const { sut } = makeSut()
    const isDateSpy = jest.spyOn(validator, 'isISO8601')
    const date = '2021-01-01'
    sut.isValid(date)
    expect(isDateSpy).toHaveBeenCalledWith(date)
  });

  test('should return false if validator returns false', () => {
    const { sut } = makeSut()
    jest.spyOn(validator, 'isISO8601').mockReturnValueOnce(false)
    const isValid = sut.isValid('2021-01-01')
    expect(isValid).toBe(false)
  });

  test('should return true if validator returns true', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('2021-01-01')
    expect(isValid).toBe(true)
  });
});