import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { DepartmentRepository } from '../department/department.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDeletedException } from './exceptions/user-deleted.exception';
import { UpdateUserOptionsDto } from './dto/update-user-options.dto';

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
      role: 'User',
    });

    await entity.setPassword(entity.login);
    return await this.userRepository.create(entity);
  }

  public async findById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UnauthorizedException(UNAUTHORIZED_MESSAGE);
    }

    if (user.isDeleted) {
      throw new UserDeletedException();
    }

    return user;
  }

  public async findByLogin(login: string) {
    return await this.userRepository.findByLogin(login);
  }

  public async findMany() {
    try {
      return this.userRepository.findMany();
    } catch {
      throw new BadRequestException();
    }
  }

  public async updateUser(id: string, dto: UpdateUserDto) {
    try {
      const existUser = await this.userRepository.findById(id);
      const existUserLogin = await this.userRepository.findByLogin(dto.login);

      if (existUserLogin && existUser.id !== existUserLogin.id) {
        throw new ConflictException();
      }

      if (existUser) {
        const entity = new UserEntity({
          ...existUser,
          ...dto,
        });
        await entity.setPassword(dto.password);
        return await this.userRepository.update(id, entity);
      }

      throw new NotFoundException();
    } catch {
      throw new BadRequestException();
    }
  }

  public async updateUserOptions(id: string, dto: UpdateUserOptionsDto) {
    try {
      const existUser = await this.userRepository.findById(id);

      if (existUser) {
        const entity = new UserEntity({
          ...existUser,
          role: dto.role ?? existUser.role,
          status: dto.status ?? existUser.status,
        });
        return await this.userRepository.update(id, entity);
      }

      throw new NotFoundException();
    } catch {
      throw new BadRequestException();
    }
  }

  public async deleteUser(id: string) {
    try {
      const existUser = await this.userRepository.findById(id);
      const entity = new UserEntity({
        ...existUser,
        isDeleted: true,
      });

      return await this.userRepository.update(id, entity);
    } catch {
      throw new NotFoundException();
    }
  }
}
