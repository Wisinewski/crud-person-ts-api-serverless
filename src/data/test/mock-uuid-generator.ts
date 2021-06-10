import { UuidGeneratorAdapter } from './../../infra/uuid/uuid-generator';

export class UuidGeneratorAdapterSpy implements UuidGeneratorAdapter {
  result: string = 'any_uuid'
  generate (): string {
    return this.result
  }
}