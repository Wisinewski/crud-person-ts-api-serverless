import { UuidGeneratorAdapterSpy } from './../../test/mock-uuid-generator';
import { throwError } from './../../../domain/test/test-helper';
import { mockPersonModel } from './../../../domain/test/mock-person';
import { AddPersonRepositorySpy, LoadPersonByCpfRepositorySpy } from './../../test/mock-db-person';
import { DbAddPerson } from "./db-add-person"

type SutTypes = {
  sut: DbAddPerson
  loadPersonByCpfRepositorySpy: LoadPersonByCpfRepositorySpy
  addPersonRepositorySpy: AddPersonRepositorySpy
  uuidGeneratorAdapterSpy: UuidGeneratorAdapterSpy
}

const makeSut = (): SutTypes => {
  const addPersonRepositorySpy = new AddPersonRepositorySpy()
  const loadPersonByCpfRepositorySpy = new LoadPersonByCpfRepositorySpy()
  const uuidGeneratorAdapterSpy = new UuidGeneratorAdapterSpy()
  const sut = new DbAddPerson(loadPersonByCpfRepositorySpy, addPersonRepositorySpy, uuidGeneratorAdapterSpy)
  return {
    sut,
    loadPersonByCpfRepositorySpy,
    addPersonRepositorySpy,
    uuidGeneratorAdapterSpy
  }
}

describe('DbAddPerson', () => {
  test('should call LoadPersonByCpfRepository with correct value', async () => {
    const { sut, loadPersonByCpfRepositorySpy } = makeSut()
    const personData = mockPersonModel()
    await sut.add(personData)
    expect(loadPersonByCpfRepositorySpy.cpf).toEqual(personData.cpf)
  });

  test('should throw if LoadPersonByCpfRepository throws', async () => {
    const { sut, loadPersonByCpfRepositorySpy } = makeSut()
    jest.spyOn(loadPersonByCpfRepositorySpy, 'loadByCpf').mockImplementationOnce(throwError)
    const personData = mockPersonModel()
    const promise = sut.add(personData)
    expect(promise).rejects.toThrow()
  });

  test('should return null if LoadPersonByCpfRepository not returns null', async () => {
    const { sut, loadPersonByCpfRepositorySpy } = makeSut()
    loadPersonByCpfRepositorySpy.result = mockPersonModel()
    const personData = mockPersonModel()
    const person = await sut.add(personData)
    expect(person).toBeNull()
  });

  test('should call AddPersonRepository with correct value', async () => {
    const { sut, addPersonRepositorySpy } = makeSut()
    const personData = mockPersonModel()
    await sut.add(personData)
    expect(addPersonRepositorySpy.person).toEqual(personData)
  });

  test('should throw if AddPersonRepository throws', async () => {
    const { sut, addPersonRepositorySpy } = makeSut()
    jest.spyOn(addPersonRepositorySpy, 'add').mockImplementationOnce(throwError)
    const personData = mockPersonModel()
    const promise = sut.add(personData)
    expect(promise).rejects.toThrow()
  });

  test('should return an person on success', async () => {
    const { sut } = makeSut()
    const personData = mockPersonModel()
    const person = await sut.add(personData)
    expect(person).toEqual(mockPersonModel())
  });
});