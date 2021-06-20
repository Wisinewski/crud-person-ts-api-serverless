import { RequiredFieldValidation } from './required-field-validation';
import { MissingParamError } from './../../presentation/errors/missing-param-error';

type SutTypes = {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation('field')
  return {
    sut
  }
}

describe('RequiredFieldValidation', () => {
  test('should return a MissingParamError if validation fails', async () => {
    const { sut } = makeSut()
    const error = sut.validate({ other_field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  });

  test('should return null if validation succeeds', async () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  });
});