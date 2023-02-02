export enum ErrorCode {
  BAD_DATA = "BAD_DATA",
  BAD_CONFIG = "BAD_CONFIG",
  CONN_ERROR = "CONN_ERROR"
}

export interface HandyManErrorMsg {
  message: string,
  code: ErrorCode
}

export class HandyManError extends Error {
  code: ErrorCode;
  constructor(code: ErrorCode, message: string) {
    super(message);
    this.name = 'HandymanError';
    this.code = code;
  }
}

