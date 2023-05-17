export enum ErrorCode {
  BAD_DATA = "BAD_DATA",
  BAD_CONFIG = "BAD_CONFIG",
  CONN_ERROR = "CONN_ERROR"
}

export interface HealthcareErrorMsg {
  message: string,
  code: ErrorCode
}

export class HealthcareError extends Error {
  code: ErrorCode;
  constructor(code: ErrorCode, message: string) {
    super(message);
    this.name = 'HealthcareError';
    this.code = code;
  }
}

