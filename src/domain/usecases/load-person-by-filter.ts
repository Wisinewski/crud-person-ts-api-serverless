import { PersonModel } from './../models/person';

export type FilterPersonParams = {
  nome?: string
  cpf?: string
  dataNascimento?: Date
  paisNascimento?: string
  estadoNascimento?: string
  cidadeNascimento?: string
}

export interface LoadPersonByFilter {
  load: (params: FilterPersonParams) => Promise<PersonModel[]>
}