import { LoadPersonByCpfRepository } from './../../../data/protocols/db/load-person-by-cpf-repository';
import { FilterPersonParams } from './../../../domain/usecases/load-person-by-filter';
import { LoadPersonByFilterRepository } from './../../../data/protocols/db/load-person-by-filter-repository';
import { UpdatePersonParams } from './../../../domain/usecases/update-person-by-id';
import { UpdatePersonByIdRepository } from './../../../data/protocols/db/update-person-by-id-repository';
import { DeletePersonByIdRepository } from './../../../data/protocols/db/delete-person-by-id-repository';
import { AddPersonParams } from './../../../domain/usecases/add-person';
import { AddPersonRepository } from './../../../data/protocols/db/add-person-repository';
import { PersonModel } from './../../../domain/models/person';
import { LoadPersonByIdRepository } from './../../../data/protocols/db/load-person-by-id-repository';
import { DynamoDB } from 'aws-sdk';
import { DynamoHelper } from './helpers/dynamo-helper';

export class PersonDynamoRepository implements LoadPersonByIdRepository, AddPersonRepository, DeletePersonByIdRepository, UpdatePersonByIdRepository, LoadPersonByFilterRepository, LoadPersonByCpfRepository {
  dynamoHelper: DynamoHelper = new DynamoHelper('PersonsTable')

  async loadById (id: string): Promise<PersonModel> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.dynamoHelper.table,
      Key: {
        id
      }
    }
    const result: DynamoDB.DocumentClient.GetItemOutput = await this.dynamoHelper.docClient.get(params).promise()
    return result.Item as PersonModel
  }

  async add (personData: AddPersonParams): Promise<PersonModel> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.dynamoHelper.table,
      Item: personData
    }
    await this.dynamoHelper.docClient.put(params).promise()
    return personData
  }


  async deleteById (id: string): Promise<boolean> {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: this.dynamoHelper.table,
      Key: {
        id
      },
      ReturnValues: 'ALL_OLD'
    }
    const result: DynamoDB.DocumentClient.DeleteItemOutput = await this.dynamoHelper.docClient.delete(params).promise()
    return !!result.Attributes
  }

  async updateById (personData: UpdatePersonParams): Promise<PersonModel> {
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.dynamoHelper.table,
      Key: { id: personData.id },
      UpdateExpression:
        'set nome = :nome, ' + 
        'dataNascimento = :dataNascimento, ' +
        'paisNascimento = :paisNascimento, ' +
        'estadoNascimento = :estadoNascimento, ' +
        'cidadeNascimento = :cidadeNascimento, ' +
        'email = :email, ' +
        'nomePai = :nomePai, ' +
        'nomeMae = :nomeMae', 
      ExpressionAttributeValues: {
        ':nome': personData.nome,
        ':dataNascimento': personData.dataNascimento,
        ':paisNascimento': personData.paisNascimento,
        ':estadoNascimento': personData.estadoNascimento,
        ':cidadeNascimento': personData.cidadeNascimento,
        ':email': personData.email,
        ':nomePai': personData.email,
        ':nomeMae': personData.nomeMae
      },
      ConditionExpression: 'attribute_exists(id)',
      ReturnValues: 'ALL_NEW'
    }
    try {
      const result: DynamoDB.DocumentClient.UpdateItemOutput = await this.dynamoHelper.docClient.update(params).promise()
      return result.Attributes as PersonModel
    } catch (error) {
      return null
    }
  }

  async loadByFilter (filterParams: FilterPersonParams): Promise<PersonModel[]> {
    let params: DynamoDB.DocumentClient.ScanInput
    if (Object.values(filterParams).length > 0) {
      params = {
        TableName: this.dynamoHelper.table,
        FilterExpression:  
          filterParams.nome ? 'nome = :nome ' : '' +
          filterParams.cpf ? 'AND cpf = :cpf AND ' : '' +
          filterParams.dataNascimento ? 'AND dataNascimento = :dataNascimento ' : '' +
          filterParams.paisNascimento ? 'AND paisNascimento = :paisNascimento ' : '' +
          filterParams.estadoNascimento ? 'AND estadoNascimento = :estadoNascimento ' : '' +
          filterParams.cidadeNascimento ? 'AND cidadeNascimento = :cidadeNascimento' : '',
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

  async loadByCpf (cpf: string): Promise<PersonModel> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: this.dynamoHelper.table,
      FilterExpression: 'cpf = :cpf',
      ExpressionAttributeValues: {
        ':cpf': cpf
      }
    }
    const result: DynamoDB.DocumentClient.ScanOutput = await this.dynamoHelper.docClient.scan(params).promise()
    return result.Items[0] as PersonModel
  }
}