import { LoadPersonByIdRepository } from './../../protocols/db/load-person-by-id-repository';
import { PersonModel } from '../../../domain/models/person';
import { LoadPersonById } from '../../../domain/usecases/load-person-by-id';

export class DbLoadPersonById implements LoadPersonById {
  constructor (
    private readonly loadPersonByIdRepository: LoadPersonByIdRepository
  ) {}

  async load (id: string): Promise<PersonModel> {
    const person = await this.loadPersonByIdRepository.loadById(id)
    return person
  }
}