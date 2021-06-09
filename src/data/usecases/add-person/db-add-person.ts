import { PersonModel } from './../../../domain/models/person';
import { LoadPersonByCpfRepository } from './../../protocols/db/load-person-by-cpf-repository';
import { AddPersonRepository } from './../../protocols/db/add-person-repository';
import { AddPerson, AddPersonParams } from './../../../domain/usecases/add-person';

export class DbAddPerson implements AddPerson {
  constructor (
    private readonly loadPersonByCpfRepository: LoadPersonByCpfRepository,
    private readonly addPersonRepository: AddPersonRepository
  ) {}

  async add (personData: AddPersonParams): Promise<PersonModel> {
    const person = await this.loadPersonByCpfRepository.loadByCpf(personData.cpf)
    if (!person) {
      const person = await this.addPersonRepository.add(personData)
      return person
    }
    return null
  }
}