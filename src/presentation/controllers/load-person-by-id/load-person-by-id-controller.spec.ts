import { mockPersonModel } from '../../../domain/test/mock-person';
import { InvalidParamError } from '../../errors/invalid-param-error';
import { ServerError } from '../../errors/server-error';
import { throwError } from '../../../domain/test/test-helper';
import { badRequest, serverError, ok, notFound } from '../../helpers/http-helper';
import { MissingParamError } from '../../errors/missing-param-error';
import { LoadPersonByIdSpy } from '../../test/mock-person';
import { LoadPersonByIdController } from './load-person-by-id-controller';
import { HttpRequest } from '../../protocols/http';
import { ValidationSpy } from '../../test/mock-validation';

const mockRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

type SutTypes = {
  sut: LoadPersonByIdController
  validationSpy: ValidationSpy
  loadPersonByIdSpy: LoadPersonByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadPersonByIdSpy = new LoadPersonByIdSpy()
  const sut = new LoadPersonByIdController(validationSpy, loadPersonByIdSpy)
  return {
    sut, 
    validationSpy,
    loadPersonByIdSpy
  }
}

describe('LoadPersonByIdController', () => {
  test('should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.data).toBe(httpRequest.params)
  });

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    const error = new MissingParamError('any_field')
    validationSpy.result = error
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(error))
  });

  test('should return 500 if LoadPersonById throws', async () => {
    const { sut, loadPersonByIdSpy } = makeSut()
    jest.spyOn(loadPersonByIdSpy, 'load').mockImplementationOnce(throwError)
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  });

  test('should call LoadPersonById with correct value', async () => {
    const { sut, loadPersonByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadPersonByIdSpy.id).toEqual(mockRequest().params.id)
  });

  test('should return 403 if LoadPersonById returns null', async () => {
    const { sut, loadPersonByIdSpy } = makeSut()
    loadPersonByIdSpy.result = null
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(notFound(new InvalidParamError('id')))
  });

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(mockPersonModel()))
  });
});