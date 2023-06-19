import {
  Controller,
  Get,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { PaginationResponse } from '../common/interface/pagination.interface';
import { EmployeeGroup } from './entities/employee-group.entity';
import { EmployeeType } from './entities/employee-type.entity';
import { QuerySelectionDto } from '../common/dtos/selection.dto';
import { UserAuthGuard } from '../auth/guards/user-auth-guard.guard';

@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@ApiTags('Employees')
@Controller('api/v1/employees')
@UsePipes(new ValidationPipe({ transform: true }))
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/selection/group')
  getEmployeeGroup(
    @Query() query: QuerySelectionDto,
  ): Promise<PaginationResponse<EmployeeGroup>> {
    return this.employeeService.getEmployeeGroup(query);
  }

  @Get('/selection/type')
  getEmployeeType(
    @Query() query: QuerySelectionDto,
  ): Promise<PaginationResponse<EmployeeType>> {
    return this.employeeService.getEmployeeType(query);
  }
}
