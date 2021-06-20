export interface DeletePersonById {
  delete: (id: string) => Promise<boolean>
}