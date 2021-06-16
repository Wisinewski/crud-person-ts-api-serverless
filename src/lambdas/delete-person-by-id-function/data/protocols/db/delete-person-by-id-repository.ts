export interface DeletePersonByIdRepository {
  deleteById: (id: string) => Promise<boolean>
}