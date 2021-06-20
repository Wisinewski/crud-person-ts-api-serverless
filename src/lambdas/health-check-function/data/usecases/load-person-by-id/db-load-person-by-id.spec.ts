import { mockPersonModel } from '../../../domain/test/mock-person';
import { throwError } from '../../../domain/test/test-helper';
import { DbLoadPersonById } from './db-load-person-by-id';
import { LoadPersonByIdRepositorySpy } from '../../test/mock-db-person';

type SutTypes = {
  sut: DbLoadPersonById
  loadPersonByIdRepositorySpy: LoadPersonByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPersonByIdRepositorySpy = new LoadPersonByIdRepositorySpy()
  const sut = new DbLoadPersonById(loadPersonByIdRepositorySpy)
  return {
    sut,
    loadPersonByIdRepositorySpy
  }
}

describe('DbLoadPersonById', () => {
  test('should call LoadPersonByIdRepository with correct value', async () => {
    const { sut, loadPersonByIdRepositorySpy } = makeSut()
    const id = 'any_id'
    await sut.load(id)
    expect(loadPersonByIdRepositorySpy.id).toBe(id)
  });

  test('should throw if LoadPersonByIdRepository throws', async () => {
    const { sut, loadPersonByIdRepositorySpy } = makeSut()
    jest.spyOn(loadPersonByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.load('any_id')
    expect(promise).rejects.toThrow()
  });

  test('should return null if LoadPersonByIdRepository returns null', async () => {
    const { sut, loadPersonByIdRepositorySpy } = makeSut()
    loadPersonByIdRepositorySpy.result = null
    const person = await sut.load('any_id')
    expect(person).toBeNull()
  });

  test('should return a person if LoadPersonByIdRepository returns a person', async () => {
    const { sut, loadPersonByIdRepositorySpy } = makeSut()
    const personModel = mockPersonModel()
    loadPersonByIdRepositorySpy.result = personModel
    const person = await sut.load('any_id')
    expect(person).toEqual(personModel)
  });
});