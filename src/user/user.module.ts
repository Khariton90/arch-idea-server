import { DepartmentRepository } from './../department/department.repository';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserService, UserRepository, DepartmentRepository],
  controllers: [UserController],
  exports: [UserRepository, DepartmentRepository],
})
export class UserModule {}
