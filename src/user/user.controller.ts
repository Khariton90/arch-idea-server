import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { fillObject } from '@core';
import { UserListRdo, UserRdo } from './rdo/user.rdo';
import { UserRequest } from '@shared-types';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserOptionsDto } from './dto/update-user-options.dto';

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
    return fillObject(UserListRdo, this.userService.findMany());
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

  @Get('logina')
  async logina(@Body() dto: any) {
    return this.userService.findByLogin(dto.login);
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

  @UseGuards(JwtAuthGuard)
  @Post('update-options/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserRdo,
    description: 'A user profile has been updated',
  })
  async updateOptions(
    @Param('id') id: string,
    @Body() body: UpdateUserOptionsDto,
  ) {
    return fillObject(UserRdo, this.userService.updateUserOptions(id, body));
  }
}
