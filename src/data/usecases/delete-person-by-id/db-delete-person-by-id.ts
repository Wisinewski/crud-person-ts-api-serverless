import { DeletePersonByIdRepository } from '../../protocols/db/delete-person-by-id-repository';
import { DeletePersonById } from '../../../domain/usecases/delete-person-by-id';

export class DbDeletePersonById implements DeletePersonById {
  constructor (
    private readonly deletePersonByIdRepository: DeletePersonByIdRepository
  ) {}

  async delete (id: string): Promise<boolean> {
    const result = await this.deletePersonByIdRepository.deleteById(id)
    return result
  }
}