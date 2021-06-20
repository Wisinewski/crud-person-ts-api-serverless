import { HttpResponse } from './../protocols/http';

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  headers: makeCommonHeaders(),
  body: JSON.stringify(data)
})

const makeCommonHeaders = (): any => ({
  'Content-Type': 'application/json',
  'X-Custom-Header': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
})