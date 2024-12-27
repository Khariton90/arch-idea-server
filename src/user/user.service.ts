import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { DepartmentRepository } from '../department/department.repository';
import { UpdateUserDto } from './dto/update-user.dto';

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
      department: department.title,
    });

    return await this.userRepository.create(entity);
  }

  public async findById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UnauthorizedException(UNAUTHORIZED_MESSAGE);
    }

    return user;
  }

  public async findMany() {
    return this.userRepository.findMany();
  }

  public async updateUser(id: string, { firstName, lastName }: UpdateUserDto) {
    try {
      const existUser = await this.userRepository.findById(id);
      if (existUser) {
        const entity = new UserEntity({ ...existUser, firstName, lastName });
        return await this.userRepository.update(id, entity);
      }

      throw new NotFoundException();
    } catch {
      throw new BadRequestException();
    }
  }
}
