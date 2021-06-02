import { throwError } from './../../../domain/test/test-helper';
import { UpdatePersonByIdRepositorySpy } from './../../test/mock-db-person';
import { mockUpdatePersonParams, mockPersonModel } from './../../../domain/test/mock-person';
import { DbUpdatePersonById } from './db-update-person-by-id';

type SutTypes = {
  sut: DbUpdatePersonById
  updatePersonByIdRepositorySpy: UpdatePersonByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const updatePersonByIdRepositorySpy = new UpdatePersonByIdRepositorySpy()
  const sut = new DbUpdatePersonById(updatePersonByIdRepositorySpy)
  return {
    sut,
    updatePersonByIdRepositorySpy
  }
}

describe('DbUpdatePersonById', () => {
  test('should call UpdatePersonByIdRepository with correct values', async () => {
    const { sut, updatePersonByIdRepositorySpy } = makeSut()
    const personData = mockUpdatePersonParams()
    await sut.update(personData)
    expect(updatePersonByIdRepositorySpy.person).toEqual(personData)
  });

  test('should throw if UpdatePersonByIdRepository throws', async () => {
    const { sut, updatePersonByIdRepositorySpy } = makeSut()
    jest.spyOn(updatePersonByIdRepositorySpy, 'updateById').mockImplementationOnce(throwError)
    const promise = sut.update(mockUpdatePersonParams())
    await expect(promise).rejects.toThrow()
  });

  test('should return null if UpdatePersonByIdRepository returns null', async () => {
    const { sut, updatePersonByIdRepositorySpy } = makeSut()
    updatePersonByIdRepositorySpy.result = null
    const person = await sut.update(mockUpdatePersonParams())
    expect(person).toBeFalsy()
  });

  test('should returns a person on success', async () => {
    const { sut } = makeSut()
    const person = await sut.update(mockUpdatePersonParams())
    expect(person).toEqual(mockPersonModel())
  });
});