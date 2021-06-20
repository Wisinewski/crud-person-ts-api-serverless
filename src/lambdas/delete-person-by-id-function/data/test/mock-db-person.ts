import { DeletePersonByIdRepository } from './../protocols/db/delete-person-by-id-repository';

export class DeletePersonByIdRepositorySpy implements DeletePersonByIdRepository {
  id: string
  result: boolean = true
  async deleteById (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}