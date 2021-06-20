import { MongoIdValidator } from './../protocols/mongo-id-validator';

export class MongoIdValidatorSpy implements MongoIdValidator {
  mongoId: string
  result: boolean = true
  isValid (mongoId: string): boolean {
    this.mongoId = mongoId
    return this.result
  }
}