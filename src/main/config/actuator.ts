import { MongoHelper } from './../../infra/db/mongodb/helpers/mongo-helper';
import { Express } from 'express';
import actuator from 'express-actuator';
import env from './env';

export default (app: Express): void => {
  app.use(actuator(options))
}

const options = {
  customEndpoints: [{
    id: 'dependencies',
    controller: async (req, res) => {
      res.status(200).json({
        name: 'MongoDB',
        uri: MongoHelper.uri,
        status: await MongoHelper.connect(env.mongoUrl).then(() => MongoHelper.client.isConnected() ? 'UP' : 'DOWN').catch(() => Promise.resolve('DOWN'))
      })
    }
  }]
}