export class ResponseError extends Error {
  statusCode: number

  constructor(message: string, error: unknown, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
  }
}
