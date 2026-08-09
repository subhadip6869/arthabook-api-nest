export class ErrorResponse {
  constructor(
    public readonly status: number,
    public readonly error: string,
    public readonly message: string,
    public readonly timestamp: string,
  ) {}
}
