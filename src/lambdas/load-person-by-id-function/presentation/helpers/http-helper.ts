import { ServerError } from './../errors/server-error';
import { HttpResponse } from './../protocols/http';

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  headers: makeCommonHeaders(),
  body: JSON.stringify(data)
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  headers: makeCommonHeaders(),
  body: JSON.stringify(data)
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  headers: makeCommonHeaders(),
  body: null
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  headers: makeCommonHeaders(),
  body: JSON.stringify({ error: error.message })
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  headers: makeCommonHeaders(),
  body: JSON.stringify({ error: error.message })
})

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  headers: makeCommonHeaders(),
  body: JSON.stringify({ error: error.message })
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  headers: makeCommonHeaders(),
  body: JSON.stringify(new ServerError(error.stack))
})

const makeCommonHeaders = (): any => ({
  'Content-Type': 'application/json',
  'X-Custom-Header': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
})