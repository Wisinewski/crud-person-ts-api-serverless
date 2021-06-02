import { MongoIdValidatorAdapter } from './mongo-id-validator-adapter';
import validator from 'validator'

type SutTypes = {
  sut: MongoIdValidatorAdapter
}

const makeSut = (): SutTypes => {
  const sut = new MongoIdValidatorAdapter()
  return {
    sut
  }
}

describe('MongoIdValidatorAdapter', () => {
  test('should call validator with correct value', () => {
    const { sut } = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isMongoId')
    sut.isValid('any_value')
    expect(isEmailSpy).toHaveBeenCalledWith('any_value')
  });

  test('should return false if validator returns false', () => {
    const { sut } = makeSut()
    jest.spyOn(validator, 'isMongoId').mockReturnValueOnce(false)
    const isValid = sut.isValid('any_id')
    expect(isValid).toBe(false)
  });

  test('should return true if validator returns true', () => {
    const { sut } = makeSut()
    jest.spyOn(validator, 'isMongoId').mockReturnValueOnce(true)
    const isValid = sut.isValid('any_id')
    expect(isValid).toBe(true)
  });
});