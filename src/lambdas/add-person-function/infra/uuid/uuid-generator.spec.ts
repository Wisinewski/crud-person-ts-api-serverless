import { UuidGeneratorAdapter } from './uuid-generator';
import { v4 as uuidv4 } from 'uuid';

//jest.spyOn(uuidv4, 'uuidv4').mockReturnValueOnce('any_uuid')

type SutTypes = {
  sut: UuidGeneratorAdapter
}

const makeSut = (): SutTypes => {
  const sut = new UuidGeneratorAdapter()
  return {
    sut
  }
}

describe('UuidGeneratorAdapter', () => {
  /*
  test('should call uuid', () => {
    const { sut } = makeSut()
    const isCpfSpy = jest.spyOn(cpf, 'isValid')
    const input = 'any_cpf'
    sut.isValid(input)
    expect(isCpfSpy).toHaveBeenCalledWith(input)
  });
  */
  test('should return an uuid if generator returns an uuid', () => {
    const { sut } = makeSut()
    //jest.spyOn(uuidv4, 'uuidv4').mockReturnValueOnce(true)
    const isValid = sut.generate()
    expect(isValid).toBeTruthy()
  });
});