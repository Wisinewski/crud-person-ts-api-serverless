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

export class PersonDynamoRepository implements LoadPersonByIdRepository, AddPersonRepository, DeletePersonByIdRepository, UpdatePersonByIdRepository, LoadPersonByFilterRepository {
  constructor (
    private readonly table: string,
    private readonly docClient: DynamoDB.DocumentClient = new DynamoDB.DocumentClient()
  ) {}

  async loadById (id: string): Promise<PersonModel> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.table,
      Key: {
        id
      }
    }
    const result: DynamoDB.DocumentClient.GetItemOutput = await this.docClient.get(params).promise()
    return result.Item as PersonModel
  }

  async add (personData: AddPersonParams): Promise<PersonModel> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.table,
      Item: personData
    }
    await this.docClient.put(params).promise()
    return personData
  }


  async deleteById (id: string): Promise<boolean> {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: this.table,
      Key: {
        id
      },
      ReturnValues: 'ALL_OLD'
    }
    const result: DynamoDB.DocumentClient.DeleteItemOutput = await this.docClient.delete(params).promise()
    return !!result.Attributes
  }

  async updateById (personData: UpdatePersonParams): Promise<PersonModel> {
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.table,
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
      ReturnValues: 'ALL_NEW'
    }
    const result: DynamoDB.DocumentClient.UpdateItemOutput = await this.docClient.update(params).promise()
    return result.Attributes as PersonModel
  }

  async loadByFilter (filterParams: FilterPersonParams): Promise<PersonModel[]> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: this.table,
      FilterExpression:  
        filterParams.nome ? 'nome = :nome, ' : '' +
        filterParams.cpf ? 'cpf = :cpf, ' : '' +
        filterParams.dataNascimento ? 'dataNascimento = :dataNascimento, ' : '' +
        filterParams.paisNascimento ? 'paisNascimento = :paisNascimento, ' : '' +
        filterParams.estadoNascimento ? 'estadoNascimento = :estadoNascimento, ' : '' +
        filterParams.cidadeNascimento ? 'cidadeNascimento = :cidadeNascimento' : '',
      ExpressionAttributeValues: {
        ':nome': filterParams.nome,
        ':cpf': filterParams.cpf,
        ':dataNascimento': filterParams.dataNascimento,
        ':paisNascimento': filterParams.paisNascimento,
        ':estadoNascimento': filterParams.estadoNascimento,
        ':cidadeNascimento': filterParams.cidadeNascimento
      }
    }
    const result: DynamoDB.DocumentClient.ScanOutput = await this.docClient.scan(params).promise()
    return result.Items as PersonModel[]
  }
}