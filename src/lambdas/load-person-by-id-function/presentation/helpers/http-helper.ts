import { ServerError } from './../errors/server-error';
import { HttpResponse } from './../protocols/http';

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: JSON.stringify(data)
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: JSON.stringify(data)
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: JSON.stringify({ error: error.message })
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: JSON.stringify({ error: error.message })
})

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: JSON.stringify({ error: error.message })
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: JSON.stringify(new ServerError(error.stack))
})