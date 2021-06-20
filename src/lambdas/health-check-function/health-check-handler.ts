import { ok } from './presentation/helpers/http-helper';
import { DynamoHelper } from './infra/db/dynamodb/helpers/dynamo-helper';
import { ApiGatewayResponse } from './main/apigateway/apigateway-response';
import { ApiGatewayEvent } from './main/apigateway/apigateway-event';
import { DynamoDB } from 'aws-sdk';

export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
  try {
    const dynamoHelper: DynamoHelper = new DynamoHelper(process.env['PERSONS_TABLE'] || 'PersonsTable')
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: dynamoHelper.table,
      Key: {
        id: 'test'
      }
    }
    await dynamoHelper.docClient.get(params).promise()
    return ok({
      app: 'up',
      dynamodb: 'up'
    })
  } catch (error) {
    return ok({
      app: 'up',
      dynamodb: 'down'
    })
  }
}