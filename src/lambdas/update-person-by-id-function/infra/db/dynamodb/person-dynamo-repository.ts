import { UpdatePersonParams } from './../../../domain/usecases/update-person-by-id';
import { UpdatePersonByIdRepository } from './../../../data/protocols/db/update-person-by-id-repository';
import { PersonModel } from './../../../domain/models/person';
import { DynamoDB } from 'aws-sdk';
import { DynamoHelper } from './helpers/dynamo-helper';

export class PersonDynamoRepository implements UpdatePersonByIdRepository {
  constructor (
    private readonly table = 'PersonsTable'
  ) {}
  
  dynamoHelper: DynamoHelper = new DynamoHelper(process.env['PERSONS_TABLE'] || this.table)

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
}