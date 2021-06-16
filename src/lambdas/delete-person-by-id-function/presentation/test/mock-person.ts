import { DeletePersonById } from './../../domain/usecases/delete-person-by-id';

export class DeletePersonByIdSpy implements DeletePersonById {
  id: string
  result: boolean = true
  async delete (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}