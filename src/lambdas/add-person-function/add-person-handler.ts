import { makeAddPersonValidation } from './main/factories/validations/add-person/add-person-validation-factory';
import { CpfInUseError } from './presentation/errors/cpf-in-use-error';
import { AddPerson } from './domain/usecases/add-person';
import { makeDbAddPerson } from './main/factories/usecases/add-person/db-add-person';
import { serverError, badRequest, conflict, created } from './presentation/helpers/http-helper';
import { ApiGatewayResponse } from './main/apigateway/apigateway-response';
import { ApiGatewayEvent } from './main/apigateway/apigateway-event';

export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
  try {
    const validation = makeAddPersonValidation()
    const error = validation.validate(JSON.parse(event.body))
    if (error) {
      return badRequest(error)
    }
    const { nome, cpf, dataNascimento, paisNascimento, estadoNascimento, cidadeNascimento, email, nomePai, nomeMae } = JSON.parse(event.body)
    const addPerson: AddPerson = makeDbAddPerson()
    const person = await addPerson.add({
      nome,
      cpf,
      dataNascimento,
      paisNascimento,
      estadoNascimento,
      cidadeNascimento,
      email,
      nomePai,
      nomeMae
    })
    if (!person) {
      return conflict(new CpfInUseError())
    }
    return created(person)
  } catch (error) {
    return serverError(error)
  }
}