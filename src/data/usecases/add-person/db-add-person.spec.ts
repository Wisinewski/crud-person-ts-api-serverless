import { throwError } from './../../../domain/test/test-helper';
import { mockAddPersonParams, mockPersonModel } from './../../../domain/test/mock-person';
import { AddPersonRepositorySpy, LoadPersonByCpfRepositorySpy } from './../../test/mock-db-person';
import { DbAddPerson } from "./db-add-person"

type SutTypes = {
  sut: DbAddPerson
  loadPersonByCpfRepositorySpy: LoadPersonByCpfRepositorySpy
  addPersonRepositorySpy: AddPersonRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPersonRepositorySpy = new AddPersonRepositorySpy()
  const loadPersonByCpfRepositorySpy = new LoadPersonByCpfRepositorySpy()
  const sut = new DbAddPerson(loadPersonByCpfRepositorySpy, addPersonRepositorySpy)
  return {
    sut,
    loadPersonByCpfRepositorySpy,
    addPersonRepositorySpy
  }
}

describe('DbAddPerson', () => {
  test('should call LoadPersonByCpfRepository with correct value', async () => {
    const { sut, loadPersonByCpfRepositorySpy } = makeSut()
    const personData = mockAddPersonParams()
    await sut.add(personData)
    expect(loadPersonByCpfRepositorySpy.cpf).toEqual(personData.cpf)
  });

  test('should throw if LoadPersonByCpfRepository throws', async () => {
    const { sut, loadPersonByCpfRepositorySpy } = makeSut()
    jest.spyOn(loadPersonByCpfRepositorySpy, 'loadByCpf').mockImplementationOnce(throwError)
    const personData = mockAddPersonParams()
    const promise = sut.add(personData)
    expect(promise).rejects.toThrow()
  });

  test('should return null if LoadPersonByCpfRepository not returns null', async () => {
    const { sut, loadPersonByCpfRepositorySpy } = makeSut()
    loadPersonByCpfRepositorySpy.result = mockPersonModel()
    const personData = mockAddPersonParams()
    const person = await sut.add(personData)
    expect(person).toBeNull()
  });

  test('should call AddPersonRepository with correct value', async () => {
    const { sut, addPersonRepositorySpy } = makeSut()
    const personData = mockAddPersonParams()
    await sut.add(personData)
    expect(addPersonRepositorySpy.person).toEqual(personData)
  });

  test('should throw if AddPersonRepository throws', async () => {
    const { sut, addPersonRepositorySpy } = makeSut()
    jest.spyOn(addPersonRepositorySpy, 'add').mockImplementationOnce(throwError)
    const personData = mockAddPersonParams()
    const promise = sut.add(personData)
    expect(promise).rejects.toThrow()
  });

  test('should return an person on success', async () => {
    const { sut } = makeSut()
    const personData = mockAddPersonParams()
    const person = await sut.add(personData)
    expect(person).toEqual(mockPersonModel())
  });
});