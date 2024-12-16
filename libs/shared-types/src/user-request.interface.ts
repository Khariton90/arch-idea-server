import { Request } from '@nestjs/common/decorators';
import { TokenPayload } from './token-payload.interface';

export interface UserRequest extends Request {
  user: TokenPayload;
}
