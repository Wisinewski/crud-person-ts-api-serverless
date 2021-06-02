import { InvalidParamError } from './../../errors/invalid-param-error';
import { UpdatePersonById } from './../../../domain/usecases/update-person-by-id';
import { badRequest, serverError, ok, notFound } from './../../helpers/http-helper';
import { HttpRequest, HttpResponse } from './../../protocols/http';
import { Validation } from './../../protocols/validation';
import { Controller } from './../../protocols/controller';

export class UpdatePersonByIdController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updatePersonById: UpdatePersonById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(Object.assign({}, httpRequest.body, httpRequest.params))
      if (error) {
        return badRequest(error)
      }
      const { id } = httpRequest.params
      const { nome, dataNascimento, paisNascimento, estadoNascimento, cidadeNascimento, email, nomePai, nomeMae } = httpRequest.body
      const person = await this.updatePersonById.update({
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
}