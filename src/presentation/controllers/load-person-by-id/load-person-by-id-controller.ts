import { InvalidParamError } from '../../errors/invalid-param-error';
import { badRequest, serverError, ok, notFound } from '../../helpers/http-helper';
import { LoadPersonById } from '../../../domain/usecases/load-person-by-id';
import { Validation } from '../../protocols/validation';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Controller } from '../../protocols/controller';

export class LoadPersonByIdController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadPersonById: LoadPersonById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const { id } = httpRequest.params
      const person = await this.loadPersonById.load(id)
      return person ? ok(person) : notFound(new InvalidParamError('id'))
    } catch (error) {
      return serverError(error)
    }
  }
}