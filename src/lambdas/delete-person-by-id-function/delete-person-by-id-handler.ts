import { InvalidParamError } from './presentation/errors/invalid-param-error';
import { noContent, notFound, serverError } from './presentation/helpers/http-helper';
import { DeletePersonById } from './domain/usecases/delete-person-by-id';
import { ApiGatewayResponse } from './main/apigateway/apigateway-response';
import { ApiGatewayEvent } from './main/apigateway/apigateway-event';
import { makeDbDeletePersonById } from './main/factories/usecases/delete-person-by-id/db-delete-person-by-id';

export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
  try {
    const { id } = event.pathParameters
    const deletePersonById: DeletePersonById = makeDbDeletePersonById()
    const person = await deletePersonById.delete(id)
    return person ? noContent() : notFound(new InvalidParamError('id'))
  } catch (error) {
    return serverError(error)
  }
};