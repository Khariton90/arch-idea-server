import { TokenPayload } from './token-payload.interface';

export interface RefreshTokenPayload extends TokenPayload {
  id?: string;
  modelName: string;
  tokenId: string;
  createdAt: Date;
}
