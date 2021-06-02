import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwagger from './config-swagger'
import setupActuator from './actuator'

const app = express()
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
setupActuator(app)
export default app