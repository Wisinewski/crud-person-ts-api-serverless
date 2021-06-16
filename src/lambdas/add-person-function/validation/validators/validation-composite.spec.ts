import { ValidationSpy } from './../../presentation/test/mock-validation';
import { ValidationComposite } from './validation-composite';
import { MissingParamError } from '../../presentation/errors/missing-param-error';

type SutTypes = {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [new ValidationSpy(), new ValidationSpy()]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('ValidationComposite', () => {
  test('should return an error if any validation fails', async () => {
    const { sut, validationSpies } = makeSut()
    const fakeError = new MissingParamError('any_field')
    validationSpies[1].result = fakeError
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(fakeError)
  });
});