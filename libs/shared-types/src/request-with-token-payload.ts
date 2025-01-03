export interface RequestWithTokenPayload<T> extends Request {
  user: T;
}
