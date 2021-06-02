import { throwError } from './../../../domain/test/test-helper';
import { LoadPersonByFilterRepositorySpy } from './../../test/mock-db-person';
import { DbLoadPersonByFilter } from './db-load-person-by-filter';
import { mockFilterPersonParams, mockPersonModel } from './../../../domain/test/mock-person';

type SutTypes = {
  sut: DbLoadPersonByFilter
  loadPersonByFilterRepositorySpy: LoadPersonByFilterRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPersonByFilterRepositorySpy = new LoadPersonByFilterRepositorySpy()
  const sut = new DbLoadPersonByFilter(loadPersonByFilterRepositorySpy)
  return {
    sut,
    loadPersonByFilterRepositorySpy
  }
}

describe('DbLoadPersonByFilter', () => {
  test('should call LoadPersonByFilterRepository with correct values', async () => {
    const { sut, loadPersonByFilterRepositorySpy } = makeSut()
    const filterParams = mockFilterPersonParams()
    await sut.load(filterParams)
    expect(loadPersonByFilterRepositorySpy.params).toEqual(filterParams)
  });

  test('should call LoadPersonByFilterRepository without values', async () => {
    const { sut, loadPersonByFilterRepositorySpy } = makeSut()
    const filterParams = {}
    await sut.load(filterParams)
    expect(loadPersonByFilterRepositorySpy.params).toEqual(filterParams)
  });

  test('should throw if LoadPersonByFilterRepository throws', async () => {
    const { sut, loadPersonByFilterRepositorySpy } = makeSut()
    jest.spyOn(loadPersonByFilterRepositorySpy, 'loadByFilter').mockImplementationOnce(throwError)
    const promise = sut.load(mockFilterPersonParams())
    await expect(promise).rejects.toThrow()
  });

  test('should return a list of persons on success', async () => {
    const { sut } = makeSut()
    const persons = await sut.load(mockFilterPersonParams())
    expect(persons).toEqual([mockPersonModel(), mockPersonModel()])
  });
});