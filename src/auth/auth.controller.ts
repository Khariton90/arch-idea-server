import {
  Body,
  Controller,
  HttpCode,
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
  User,
  UserRequest,
} from '@shared-types';
import { JwtRefreshGuard } from 'src/guards/jwt-refresh.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

import { Request } from '@nestjs/common/decorators';
import { CreateAuthDto } from './dto/create-auth.dto';

interface RequestWithUser extends Request {
  user: User;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  async login(@Req() { user }: RequestWithUser, @Body() dto: CreateAuthDto) {
    return await this.authService.loginUser(user, dto.modelName);
  }

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
  async refresh(@Req() { user }: RequestWithTokenPayload<RefreshTokenPayload>) {
    const { sub, role, department, modelName } = user;

    return fillObject(
      AuthRdo,
      this.authService.loginUser({ id: sub, role, department }, modelName),
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
