import { makeAddPersonValidation } from './../../factories/validations/add-person/add-person-validation-factory';
import { CpfInUseError } from './../../../presentation/errors/cpf-in-use-error';
import { AddPerson } from './../../../domain/usecases/add-person';
import { makeDbAddPerson } from './../../factories/usecases/add-person/db-add-person';
import { serverError, badRequest, conflict, created } from './../../../presentation/helpers/http-helper';
import { ApiGatewayResponse } from './../../apigateway/apigateway-response';
import { ApiGatewayEvent } from './../../apigateway/apigateway-event';

export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
  try {
    const validation = makeAddPersonValidation()
    const error = validation.validate(event.body)
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