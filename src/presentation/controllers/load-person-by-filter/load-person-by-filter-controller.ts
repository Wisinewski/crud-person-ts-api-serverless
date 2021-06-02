import { serverError, noContent, ok } from './../../helpers/http-helper';
import { LoadPersonByFilter } from './../../../domain/usecases/load-person-by-filter';
import { HttpRequest, HttpResponse } from './../../protocols/http';
import { Controller } from './../../protocols/controller';

export class LoadPersonByFilterController implements Controller {
  constructor (
    private readonly loadPersonByFilter: LoadPersonByFilter
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const persons = await this.loadPersonByFilter.load(httpRequest.query)
      return ok(persons)
    } catch (error) {
      return serverError(error)
    }
  }
}