import { Entity } from '@core';
import { Location, RefreshTokenPayload, UserRole } from '@shared-types';

export class RefreshTokenEntity
  implements Entity<RefreshTokenPayload>, RefreshTokenPayload
{
  public id: string;
  public modelName: string;
  public tokenId: string;
  public sub: string;
  public role: UserRole;
  public department: Location;
  public createdAt: Date;

  constructor(token: RefreshTokenPayload) {
    this.fillEntity(token);
  }

  public toObject(): RefreshTokenPayload {
    return { ...this };
  }

  public fillEntity(entity: RefreshTokenPayload): void {
    this.modelName = entity.modelName;
    this.tokenId = entity.tokenId;
    this.sub = entity.sub;
    this.role = entity.role;
    this.department = entity.department;
    this.createdAt = entity.createdAt;
  }
}
