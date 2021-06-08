import { DeletePersonByIdRepository } from './../../../data/protocols/db/delete-person-by-id-repository';
import { AddPersonParams } from './../../../domain/usecases/add-person';
import { AddPersonRepository } from './../../../data/protocols/db/add-person-repository';
import { PersonModel } from './../../../domain/models/person';
import { LoadPersonByIdRepository } from './../../../data/protocols/db/load-person-by-id-repository';
import { DynamoDB } from 'aws-sdk';

export class PersonDynamoRepository implements LoadPersonByIdRepository, AddPersonRepository, DeletePersonByIdRepository {
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
}