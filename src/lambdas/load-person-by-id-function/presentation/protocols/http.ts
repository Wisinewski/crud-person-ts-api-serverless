export type HttpRequest = {
  body?: any
  headers?: any
  params?: any
  query?: any
}

export type HttpResponse = {
  statusCode: number
  headers: any
  body: any
}