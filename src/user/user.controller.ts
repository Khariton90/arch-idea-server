import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { fillObject } from '@core';
import { UserRdo } from './rdo/user.rdo';
import { UserRequest } from '@shared-types';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async findMany() {
    return fillObject(UserRdo, this.userService.findMany());
  }

  @Post('/create')
  async create(@Body() dto: any) {
    return fillObject(UserRdo, this.userService.create(dto));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/account')
  async findById(@Req() { user }: UserRequest) {
    return fillObject(UserRdo, this.userService.findById(user.sub));
  }
}
