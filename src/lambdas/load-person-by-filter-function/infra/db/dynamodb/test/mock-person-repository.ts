import { DynamoHelper } from './../helpers/dynamo-helper';
import { PersonModel } from './../../../../domain/models/person';
import { DynamoDB } from 'aws-sdk';

export class MockPersonRepository { 
  constructor (
    private readonly dynamoHelper: DynamoHelper
  ) {}

  async addPerson (person: PersonModel): Promise<void> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.dynamoHelper.table,
      Item: person
    }
    await this.dynamoHelper.docClient.put(params).promise()
    return
  }

  async deletePerson (id: string): Promise<boolean> {
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