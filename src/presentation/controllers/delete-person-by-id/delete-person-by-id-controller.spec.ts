import { InvalidParamError } from './../../errors/invalid-param-error';
import { ServerError } from './../../errors/server-error';
import { throwError } from './../../../domain/test/test-helper';
import { DeletePersonByIdSpy } from './../../test/mock-person';
import { MissingParamError } from './../../errors/missing-param-error';
import { badRequest, serverError, noContent, notFound } from './../../helpers/http-helper';
import { DeletePersonByIdController } from './delete-person-by-id-controller';
import { ValidationSpy } from '../../test/mock-validation';
import { HttpRequest } from './../../protocols/http';

const mockRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

type SutTypes = {
  sut: DeletePersonByIdController
  validationSpy: ValidationSpy
  deletePersonByIdSpy: DeletePersonByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const deletePersonByIdSpy = new DeletePersonByIdSpy()
  const sut = new DeletePersonByIdController(validationSpy, deletePersonByIdSpy)
  return {
    sut,
    validationSpy,
    deletePersonByIdSpy
  }
}

describe('DeletePersonByIdController', () => {
  test('should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.data).toEqual(httpRequest.params)
  });

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    const error = new MissingParamError('any_field')
    validationSpy.result = error
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  });

  test('should call DeletePersonById with correct value', async () => {
    const { sut, deletePersonByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(deletePersonByIdSpy.id).toBe(httpRequest.params.id)
  });

  test('should return 500 if DeletePersonById throws', async () => {
    const { sut, deletePersonByIdSpy } = makeSut()
    jest.spyOn(deletePersonByIdSpy, 'delete').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  });

  test('should return 403 if DeletePersonById returns false', async () => {
    const { sut, deletePersonByIdSpy } = makeSut()
    deletePersonByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound(new InvalidParamError('id')))
  });

  test('should return 204 if DeletePersonById returns true', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  });
});