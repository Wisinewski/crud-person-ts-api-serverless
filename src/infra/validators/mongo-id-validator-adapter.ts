import { MongoIdValidator } from './../../validation/protocols/mongo-id-validator';
import validator from 'validator';

export class MongoIdValidatorAdapter implements MongoIdValidator {
  isValid (mongoId: string): boolean {
    return validator.isMongoId(mongoId)
  }
}