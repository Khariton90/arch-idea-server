import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './dto/department.dto';
import { fillObject } from '@core';
import { DepartmentRdo } from './rdo/departments.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new department has been created',
    type: DepartmentRdo,
  })
  public create(@Body() dto: DepartmentDto) {
    return fillObject(DepartmentRdo, this.departmentService.create(dto));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The full list of departments has been received',
    type: [DepartmentRdo],
  })
  public async findMany() {
    return fillObject(DepartmentRdo, this.departmentService.findMany());
  }
}
