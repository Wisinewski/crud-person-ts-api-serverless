import { mockPersonModel } from './../../domain/test/mock-person';
import { PersonModel } from './../../domain/models/person';
import { LoadPersonByCpfRepository } from './../protocols/db/load-person-by-cpf-repository';
import { AddPersonParams } from './../../domain/usecases/add-person';
import { AddPersonRepository } from './../protocols/db/add-person-repository';

export class AddPersonRepositorySpy implements AddPersonRepository {
  person: AddPersonParams
  result: PersonModel = mockPersonModel()
  async add (person: AddPersonParams): Promise<PersonModel> {
    this.person = person
    return this.result
  }
}

export class LoadPersonByCpfRepositorySpy implements LoadPersonByCpfRepository {
  cpf: string
  result: PersonModel = null
  async loadByCpf (cpf: string): Promise<PersonModel> {
    this.cpf = cpf
    return this.result
  }
}