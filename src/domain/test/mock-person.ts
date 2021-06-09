import { FilterPersonParams } from './../usecases/load-person-by-filter';
import { UpdatePersonParams } from './../usecases/update-person-by-id';
import { PersonModel } from './../models/person';

export const mockPersonModel = (): PersonModel => ({
  id: 'any_id',
  nome: 'any_nome',
  cpf: 'any_cpf',
  dataNascimento: '2021-01-01',
  paisNascimento: 'any_paisNascimento',
  estadoNascimento: 'any_estadoNascimento',
  cidadeNascimento: 'any_cidadeNascimento',
  email: 'any_emailNascimento',
  nomePai: 'any_nomePai',
  nomeMae: 'any_nomeMae'
})

export const mockUpdatePersonParams = (): UpdatePersonParams => ({
  id: 'any_id',
  nome: 'any_nome',
  dataNascimento: '2021-01-01',
  paisNascimento: 'any_paisNascimento',
  estadoNascimento: 'any_estadoNascimento',
  cidadeNascimento: 'any_cidadeNascimento',
  email: 'any_emailNascimento',
  nomePai: 'any_nomePai',
  nomeMae: 'any_nomeMae'
})

export const mockFilterPersonParams = (): FilterPersonParams => ({
  nome: 'any_nome',
  cpf: 'any_cpf',
  dataNascimento: '2021-01-01',
  paisNascimento: 'any_paisNascimento',
  estadoNascimento: 'any_estadoNascimento',
  cidadeNascimento: 'any_cidadeNascimento'
})