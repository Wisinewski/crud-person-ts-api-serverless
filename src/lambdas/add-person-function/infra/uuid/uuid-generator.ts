import { UuidGeneration } from './../../presentation/protocols/uuid-generation';
import { v4 as uuidv4 } from 'uuid'

export class UuidGeneratorAdapter implements UuidGeneration {
  generate (): string {
    //return Date.now().toString()
    return uuidv4()
  }
}