import { LoadPersonByCpfRepository } from './../../../data/protocols/db/load-person-by-cpf-repository';
import { AddPersonRepository } from './../../../data/protocols/db/add-person-repository';
import { PersonModel } from './../../../domain/models/person';
import { DynamoDB } from 'aws-sdk';
import { DynamoHelper } from './helpers/dynamo-helper';

export class PersonDynamoRepository implements AddPersonRepository, LoadPersonByCpfRepository {
  constructor (
    private readonly table = 'PersonsTable'
  ) {}
  
  dynamoHelper: DynamoHelper = new DynamoHelper(process.env['PERSONS_TABLE'] || this.table)

  async add (personData: PersonModel): Promise<PersonModel> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.dynamoHelper.table,
      Item: personData
    }
    await this.dynamoHelper.docClient.put(params).promise()
    return personData
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