import { InvalidParamError } from './../../../presentation/errors/invalid-param-error';
import { noContent, notFound, serverError } from './../../../presentation/helpers/http-helper';
import { makeDbDeletePersonById } from '../../factories/usecases/delete-person-by-id/db-delete-person-by-id';
import { DeletePersonById } from './../../../domain/usecases/delete-person-by-id';
import { ApiGatewayEvent } from './../../apigateway/apigateway-event';
import { ApiGatewayResponse } from './../../apigateway/apigateway-response';

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