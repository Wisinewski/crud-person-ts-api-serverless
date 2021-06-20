import { LoadPersonById } from './../../domain/usecases/load-person-by-id';
import { LoadPersonByFilter, FilterPersonParams } from './../../domain/usecases/load-person-by-filter';
import { UpdatePersonById, UpdatePersonParams } from './../../domain/usecases/update-person-by-id';
import { DeletePersonById } from './../../domain/usecases/delete-person-by-id';
import { mockPersonModel } from './../../domain/test/mock-person';
import { PersonModel } from './../../domain/models/person';
import { AddPerson, AddPersonParams } from './../../domain/usecases/add-person';

export class AddPersonSpy implements AddPerson {
  person: AddPersonParams
  result: PersonModel = mockPersonModel()
  async add (person: AddPersonParams): Promise<PersonModel> {
    this.person = person
    return this.result
  }
}

export class LoadPersonByIdSpy implements LoadPersonById {
  id: string
  result: PersonModel = mockPersonModel()
  async load (id: string): Promise<PersonModel> {
    this.id = id
    return this.result
  }
}

export class DeletePersonByIdSpy implements DeletePersonById {
  id: string
  result: boolean = true
  async delete (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}

export class UpdatePersonByIdSpy implements UpdatePersonById {
  person: UpdatePersonParams
  result: PersonModel = mockPersonModel()
  async update (person: UpdatePersonParams): Promise<PersonModel> {
    this.person = person
    return this.result
  }
}

export class LoadPersonByFilterSpy implements LoadPersonByFilter {
  params: FilterPersonParams
  result: PersonModel[] = [mockPersonModel(), mockPersonModel()]
  async load (params: FilterPersonParams): Promise<PersonModel[]> {
    this.params = params
    return this.result
  }
}