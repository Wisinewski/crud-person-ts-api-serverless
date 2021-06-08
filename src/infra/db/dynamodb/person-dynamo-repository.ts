import { PersonModel } from './../../../domain/models/person';
import { LoadPersonByIdRepository } from './../../../data/protocols/db/load-person-by-id-repository';
import { DynamoDB } from 'aws-sdk';

export class PersonDynamoRepository implements LoadPersonByIdRepository {
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
}