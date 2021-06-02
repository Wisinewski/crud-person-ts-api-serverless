import { PersonModel } from './../../../domain/models/person';
import { UpdatePersonParams, UpdatePersonById } from './../../../domain/usecases/update-person-by-id';
import { UpdatePersonByIdRepository } from './../../protocols/db/update-person-by-id-repository';

export class DbUpdatePersonById implements UpdatePersonById {
  constructor (
    private readonly updatePersonByIdRepository: UpdatePersonByIdRepository
  ) {}

  async update (personData: UpdatePersonParams): Promise<PersonModel> {
    personData.dataNascimento = new Date(personData.dataNascimento)
    const person = await this.updatePersonByIdRepository.updateById(personData)
    return person
  }
}