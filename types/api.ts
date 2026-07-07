export interface ApiResponse<T = Record<string, unknown>> {
  status: string;
  message?: string;
  data?: T;
}

export interface ApiErrorDetail {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  status: string;
  message: string;
  errors?: ApiErrorDetail[];
}

export class ApiError extends Error {
  readonly statusCode: number;
  readonly response: ApiErrorResponse;

  constructor(statusCode: number, response: ApiErrorResponse) {
    super(response.message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.response = response;
  }
}
