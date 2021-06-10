import { ok, serverError } from './../../../presentation/helpers/http-helper';
import { makeDbLoadPersonByFilter } from './../../factories/usecases/load-person-by-filter/db-load-person-by-filter';
import { LoadPersonByFilter } from './../../../domain/usecases/load-person-by-filter';
import { ApiGatewayResponse } from './../../apigateway/apigateway-response';
import { ApiGatewayEvent } from './../../apigateway/apigateway-event';

export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
  try {
    const loadPersonByFilter: LoadPersonByFilter = makeDbLoadPersonByFilter()
    const persons = await loadPersonByFilter.load(event['queryStringParameters'] ? event['queryStringParameters'] : {} )
    return ok(persons)
  } catch (error) {
    return serverError(error)
  }
};