import { FilterPersonParams } from './../../../domain/usecases/load-person-by-filter';
import { LoadPersonByFilterRepository } from './../../../data/protocols/db/load-person-by-filter-repository';
import { PersonModel } from './../../../domain/models/person';
import { DynamoDB } from 'aws-sdk';
import { DynamoHelper } from './helpers/dynamo-helper';

export class PersonDynamoRepository implements LoadPersonByFilterRepository {
  constructor (
    private readonly table = 'PersonsTable'
  ) {}
  
  dynamoHelper: DynamoHelper = new DynamoHelper(process.env['PERSONS_TABLE'] || this.table)

  async loadByFilter (filterParams: FilterPersonParams): Promise<PersonModel[]> {
    let params: DynamoDB.DocumentClient.ScanInput
    if (Object.values(filterParams).length > 0) {
      const fixedFilters = ['nome', 'cpf', 'dataNascimento', 'paisNascimento', 'estadoNascimento', 'cidadeNascimento']
      const keys = Object.keys(filterParams)
      let filterExpression = ''
      filterExpression += `${keys[0]} = :${keys[0]} `
      filterExpression += fixedFilters.find(filter => filter === keys[1]) ? `AND ${keys[1]} = :${keys[1]} ` : ''
      filterExpression += fixedFilters.find(filter => filter === keys[2]) ? `AND ${keys[2]} = :${keys[2]} ` : ''
      filterExpression += fixedFilters.find(filter => filter === keys[3]) ? `AND ${keys[3]} = :${keys[3]} ` : ''
      filterExpression += fixedFilters.find(filter => filter === keys[4]) ? `AND ${keys[4]} = :${keys[4]} ` : ''
      filterExpression += fixedFilters.find(filter => filter === keys[5]) ? `AND ${keys[5]} = :${keys[5]} ` : ''
      params = {
        TableName: this.dynamoHelper.table,
        FilterExpression:  
          filterExpression,
        ExpressionAttributeValues: {
          ':nome': filterParams.nome,
          ':cpf': filterParams.cpf,
          ':dataNascimento': filterParams.dataNascimento,
          ':paisNascimento': filterParams.paisNascimento,
          ':estadoNascimento': filterParams.estadoNascimento,
          ':cidadeNascimento': filterParams.cidadeNascimento
        }
      }
    } else {
      params = {
        TableName: this.dynamoHelper.table,
        Select: 'ALL_ATTRIBUTES'
      }
    }
    const result: DynamoDB.DocumentClient.ScanOutput = await this.dynamoHelper.docClient.scan(params).promise()
    return result.Items as PersonModel[]
  }
}