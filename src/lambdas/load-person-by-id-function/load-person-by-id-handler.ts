import { InvalidParamError } from './presentation/errors/invalid-param-error';
import { ok, notFound, serverError } from './presentation/helpers/http-helper';
import { makeDbLoadPersonById } from './main/factories/usecases/load-person-by-id/db-load-person-by-id';
import { LoadPersonById } from './domain/usecases/load-person-by-id';
import { ApiGatewayResponse } from './main/apigateway/apigateway-response';
import { ApiGatewayEvent } from './main/apigateway/apigateway-event';

export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
  try {
    const { id } = event.pathParameters
    const loadPersonById: LoadPersonById = makeDbLoadPersonById()
    const person = await loadPersonById.load(id)
    return person ? ok(person) : notFound(new InvalidParamError('id'))
  } catch (error) {
    return serverError(error)
  }
};