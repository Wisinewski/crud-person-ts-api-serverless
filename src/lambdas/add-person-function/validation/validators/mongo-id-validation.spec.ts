import { MongoIdValidatorSpy } from './../test/mock-mongo-id-validator';
import { MongoIdValidation } from './mongo-id-validation';
import { InvalidParamError } from './../../presentation/errors/invalid-param-error';

type SutTypes = {
  sut: MongoIdValidation
  mongoIdValidatorSpy: MongoIdValidatorSpy
}

const makeSut = (): SutTypes => {
  const mongoIdValidatorSpy = new MongoIdValidatorSpy()
  const sut = new MongoIdValidation('id', mongoIdValidatorSpy)
  return {
    sut,
    mongoIdValidatorSpy
  }
}

describe('MongoIdValidation', () => {
  test('should return an error if MongoIdValidator returns false', async () => {
    const { sut, mongoIdValidatorSpy } = makeSut()
    mongoIdValidatorSpy.result = false
    const error = sut.validate({ id: 'any_id' })
    expect(error).toEqual(new InvalidParamError('id'))
  });

  test('should call MongoIdValidator with correct value', async () => {
    const { sut, mongoIdValidatorSpy } = makeSut()
    const id = 'any_id'
    sut.validate({ id })
    expect(mongoIdValidatorSpy.mongoId).toBe(id)
  });
});