import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { fillObject } from '@core';
import { UserRdo } from './rdo/user.rdo';
import { UserRequest } from '@shared-types';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [UserRdo],
    description: 'The full list of users has been received',
  })
  async findMany() {
    return fillObject(UserRdo, this.userService.findMany());
  }

  @Post('create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserRdo,
    description: 'A new new user has been created',
  })
  async create(@Body() dto: any) {
    return fillObject(UserRdo, this.userService.create(dto));
  }

  @UseGuards(JwtAuthGuard)
  @Get('account')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserRdo,
    description: 'A user profile has been received',
  })
  async findById(@Req() { user }: UserRequest) {
    return fillObject(UserRdo, this.userService.findById(user.sub));
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserRdo,
    description: 'A user profile has been updated',
  })
  async update(@Body() body: UpdateUserDto, @Req() { user }: UserRequest) {
    return fillObject(UserRdo, this.userService.updateUser(user.sub, body));
  }
}
