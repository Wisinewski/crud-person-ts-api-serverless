import { v4 as uuidv4 } from 'uuid';
import { UuidGeneration } from './../../presentation/protocols/uuid-generation';

export class UuidGeneratorAdapter implements UuidGeneration {
  generate (): string {
    return uuidv4()
  }
}