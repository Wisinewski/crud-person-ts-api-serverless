import { LoadPersonByIdRepository } from './../protocols/db/load-person-by-id-repository';
import { mockPersonModel } from './../../domain/test/mock-person';
import { FilterPersonParams } from './../../domain/usecases/load-person-by-filter';
import { LoadPersonByFilterRepository } from './../protocols/db/load-person-by-filter-repository';
import { UpdatePersonParams } from './../../domain/usecases/update-person-by-id';
import { UpdatePersonByIdRepository } from './../protocols/db/update-person-by-id-repository';
import { DeletePersonByIdRepository } from './../protocols/db/delete-person-by-id-repository';
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

export class DeletePersonByIdRepositorySpy implements DeletePersonByIdRepository {
  id: string
  result: boolean = true
  async deleteById (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}

export class UpdatePersonByIdRepositorySpy implements UpdatePersonByIdRepository {
  person: UpdatePersonParams
  result: PersonModel = mockPersonModel()
  async updateById (person: UpdatePersonParams): Promise<PersonModel> {
    this.person = person
    return this.result
  }
}

export class LoadPersonByFilterRepositorySpy implements LoadPersonByFilterRepository {
  params: FilterPersonParams
  result: PersonModel[] = [mockPersonModel(), mockPersonModel()]
  async loadByFilter (params: FilterPersonParams): Promise<PersonModel[]> {
    this.params = params
    return this.result
  }
}

export class LoadPersonByIdRepositorySpy implements LoadPersonByIdRepository {
  id: string
  result: PersonModel = mockPersonModel()
  async loadById (id: string): Promise<PersonModel> {
    this.id = id
    return this.result
  }
}