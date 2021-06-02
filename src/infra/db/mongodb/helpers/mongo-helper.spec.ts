import { MongoHelper as sut } from './mongo-helper'

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('should reconnect if mongodb is down', async () => {
    let personCollection = await sut.getCollection('persons')
    expect(personCollection).toBeTruthy()
    await sut.disconnect()
    personCollection = await sut.getCollection('persons')
    expect(personCollection).toBeTruthy()
  });
});