import { DeletePersonByIdRepository } from './../../../data/protocols/db/delete-person-by-id-repository';
import { DynamoDB } from 'aws-sdk';
import { DynamoHelper } from './helpers/dynamo-helper';

export class PersonDynamoRepository implements DeletePersonByIdRepository {
  constructor (
    private readonly table = 'PersonsTable'
  ) {}
  
  dynamoHelper: DynamoHelper = new DynamoHelper(process.env['PERSONS_TABLE'] || this.table)

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
}