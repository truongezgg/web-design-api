import { Response } from 'express';
import { ErrorCode } from '$types/enum';

export const success = (res: Response, result = {}, status = 200, payload = {}) => {
  res.status(status).send({ success: true, status, data: result, ...payload });
};

export const fail = (res: Response, error: any, status = 400) => {
  const result = { success: false, status, data: null };

  if (error?.errorMessage) {
    const status = error?.status || result.status;
    const payload = error?.payload || {};
    Object.assign(result, { status, message: error?.errorMessage, payload });
  } else {
    Object.assign(result, { message: ErrorCode.Unknown_Error });
  }

  return res.status(status).send(result);
};

export const error = (errorMessage: ErrorCode, status = 400, payload = {}) => {
  return { errorMessage, status, payload };
};
