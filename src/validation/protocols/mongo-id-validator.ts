export interface MongoIdValidator {
  isValid: (mongoId: string) => boolean
}