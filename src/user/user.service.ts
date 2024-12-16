import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { DepartmentRepository } from '../department/department.repository';
import { Status } from '@shared-types';

const UNAUTHORIZED_MESSAGE = 'Access is denied';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly departmentRepository: DepartmentRepository,
  ) {}

  public async create(dto: CreateUserDto) {
    const department = await this.departmentRepository.findQrCode(dto.sub);

    if (!department) {
      throw new UnauthorizedException(UNAUTHORIZED_MESSAGE);
    }

    const entity = new UserEntity({
      role: 'user',
      status: Status.Spec,
      department: department.title,
    });
    return await this.userRepository.create(entity);
  }
}
