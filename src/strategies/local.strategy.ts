import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { AuthService } from 'src/auth/auth.service';

const USERNAME_FIELD_NAME = 'login';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: USERNAME_FIELD_NAME,
    });
  }

  public async validate(
    login: string,
    password: string,
    modelName: string,
  ): Promise<UserEntity> {
    return this.authService.verifyUser({ login, password, modelName });
  }
}
