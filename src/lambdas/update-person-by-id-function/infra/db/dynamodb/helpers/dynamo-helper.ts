import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DynamoDB } from 'aws-sdk'

export class DynamoHelper {
  constructor (
    public readonly table: string
  ) {}

  docClient: DocumentClient = this.instantiate()

  instantiate (): any {
    const docClient = new DynamoDB.DocumentClient({
      convertEmptyValues: true,
      ...(process.env.JEST_WORKER_ID && {
        endpoint: 'localhost:8000',
        sslEnabled: false,
        region: 'local-env'
      })
    })
    return docClient
  }
}