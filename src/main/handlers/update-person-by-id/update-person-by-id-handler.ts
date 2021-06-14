import { InvalidParamError } from './../../../presentation/errors/invalid-param-error';
import { UpdatePersonById } from './../../../domain/usecases/update-person-by-id';
import { badRequest, notFound, ok, serverError } from './../../../presentation/helpers/http-helper';
import { makeUpdatePersonByIdValidation } from './../../factories/validations/update-person-by-id/update-person-by-id-validation-factory';
import { makeDbUpdatePersonById } from './../../factories/usecases/update-person-by-id/db-update-person-by-id';
import { ApiGatewayResponse } from './../../apigateway/apigateway-response';
import { ApiGatewayEvent } from './../../apigateway/apigateway-event';

export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
  try {
    const validation = makeUpdatePersonByIdValidation()
    const error = validation.validate(JSON.parse(event.body))
    if (error) {
      return badRequest(error)
    }
    const { id } = event.pathParameters
    const { nome, dataNascimento, paisNascimento, estadoNascimento, cidadeNascimento, email, nomePai, nomeMae } = JSON.parse(event.body)
    const updatePersonById: UpdatePersonById = makeDbUpdatePersonById()
    const person = await updatePersonById.update({
      id,
      nome,
      dataNascimento,
      paisNascimento,
      estadoNascimento,
      cidadeNascimento,
      email,
      nomePai,
      nomeMae
    })
    if (!person) {
      return notFound(new InvalidParamError('id'))
    }
    return ok(person)
  } catch (error) {
    return serverError(error)
  }
}