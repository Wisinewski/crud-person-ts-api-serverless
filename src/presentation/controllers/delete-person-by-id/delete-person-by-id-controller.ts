import { InvalidParamError } from './../../errors/invalid-param-error';
import { DeletePersonById } from './../../../domain/usecases/delete-person-by-id';
import { badRequest, serverError, noContent, notFound } from './../../helpers/http-helper';
import { HttpRequest, HttpResponse } from './../../protocols/http';
import { Validation } from './../../protocols/validation';
import { Controller } from './../../protocols/controller';

export class DeletePersonByIdController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly deletePersonById: DeletePersonById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const { id } = httpRequest.params
      const result = await this.deletePersonById.delete(id)
      return result ? noContent() : notFound(new InvalidParamError('id'))
    } catch (error) {
      return serverError(error)
    }
  }
}