import { LoadPersonByFilterRepository } from './../../protocols/db/load-person-by-filter-repository';
import { PersonModel } from './../../../domain/models/person';
import { LoadPersonByFilter, FilterPersonParams } from './../../../domain/usecases/load-person-by-filter';

export class DbLoadPersonByFilter implements LoadPersonByFilter {
  constructor (
    private readonly loadPersonByFilterRepository: LoadPersonByFilterRepository
  ) {}

  async load (params: FilterPersonParams): Promise<PersonModel[]> {
    const query = {}
    if (params.nome) query['nome'] = params.nome
    if (params.cpf) query['cpf'] = params.cpf
    if (params.dataNascimento) query['dataNascimento'] = new Date(params.dataNascimento)
    if (params.paisNascimento) query['paisNascimento'] = params.paisNascimento
    if (params.estadoNascimento) query['estadoNascimento'] = params.estadoNascimento
    if (params.cidadeNascimento) query['cidadeNascimento'] = params.cidadeNascimento
    const persons = await this.loadPersonByFilterRepository.loadByFilter(query)
    return persons
  }
}