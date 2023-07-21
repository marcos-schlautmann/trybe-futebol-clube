export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';

type ServiceResponseSucessType = 'SUCESSFUL' | 'OK';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSucess<T> = {
  status: ServiceResponseSucessType,
  data: T;
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSucess<T>;
