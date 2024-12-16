import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@core';
import { AuthRdo } from './rdo/auth.rdo';

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
}
