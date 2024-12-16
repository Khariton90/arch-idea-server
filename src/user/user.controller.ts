import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { fillObject } from '@core';
import { UserRdo } from './rdo/user.rdo';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  public async create(@Body() dto: any) {
    return fillObject(UserRdo, this.userService.create(dto));
  }
}
