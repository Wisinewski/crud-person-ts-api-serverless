import { PersonModel } from './../../../domain/models/person';
import { LoadPersonByIdRepository } from './../../../data/protocols/db/load-person-by-id-repository';
import { DynamoDB } from 'aws-sdk';
import { DynamoHelper } from './helpers/dynamo-helper';

export class PersonDynamoRepository implements LoadPersonByIdRepository {
  constructor (
    private readonly table = 'PersonsTable'
  ) {}
  
  dynamoHelper: DynamoHelper = new DynamoHelper(process.env['PERSONS_TABLE'] || this.table)

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
}