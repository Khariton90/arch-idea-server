import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@core';
import { AuthRdo } from './rdo/auth.rdo';
import {
  RefreshTokenPayload,
  RequestWithTokenPayload,
  UserRequest,
} from '@shared-types';
import { JwtRefreshGuard } from 'src/guards/jwt-refresh.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AuthRdo,
    description: 'The new user has been successfully created.',
  })
  async create(@Body() dto: CreateUserDto): Promise<AuthRdo> {
    return fillObject(AuthRdo, this.authService.register(dto));
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async login(@Req() { user }: RequestWithTokenPayload<RefreshTokenPayload>) {
    const { sub, role, department, modelName, tokenId } = user;

    return fillObject(
      AuthRdo,
      this.authService.loginUser(
        { id: sub, role, department },
        modelName,
        tokenId,
      ),
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The user has been logout session.',
  })
  @Post('signOut')
  async signOut(@Req() { user }: UserRequest) {
    return await this.authService.signOut(user.sub);
  }
}
