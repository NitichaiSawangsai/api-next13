import {
  Controller,
  Get,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MasterService } from './master.service';
import { QuerySelectionDto } from '../common/dtos/selection.dto';
import { PaginationResponse } from '../common/interface/pagination.interface';
import { ScgDepartment } from './entities/scg-department.entity';
import { ScgPosition } from './entities/scg-position.entity';
import { Section } from './entities/section.entity';
import { SubDivision } from './entities/sub-division.entity';
import { Workforce } from './entities/workforce.entity';
import { Company } from './entities/company.entity';
import { DoDepartment } from './entities/do-department.entity';
import { UserAuthGuard } from '../auth/guards/user-auth-guard.guard';
import { UserReq } from '../common/custom-decorators/auth.custom-decorators';
import { User } from '../user-management/entities/user.entity';

@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@ApiTags('Master')
@Controller('api/v1/master')
@UsePipes(new ValidationPipe({ transform: true }))
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Get('/selection/do-department')
  getDoDepartment(
    @UserReq() user: User,
    @Query() query: QuerySelectionDto,
  ): Promise<PaginationResponse<DoDepartment>> {
    return this.masterService.getDoDepartment(query);
  }
  @Get('/selection/scg-department')
  getScgDepartment(
    @Query() query: QuerySelectionDto,
  ): Promise<PaginationResponse<ScgDepartment>> {
    return this.masterService.getScgDepartment(query);
  }

  @Get('/selection/scg-position')
  getScgPosition(
    @Query() query: QuerySelectionDto,
  ): Promise<PaginationResponse<ScgPosition>> {
    return this.masterService.getScgPosition(query);
  }

  @Get('/selection/section')
  getSection(
    @Query() query: QuerySelectionDto,
  ): Promise<PaginationResponse<Section>> {
    return this.masterService.getSection(query);
  }

  @Get('/selection/sub-division')
  getSubdivision(
    @Query() query: QuerySelectionDto,
  ): Promise<PaginationResponse<SubDivision>> {
    return this.masterService.getSubdivision(query);
  }

  @Get('/selection/workforce')
  getWorkforce(
    @Query() query: QuerySelectionDto,
  ): Promise<PaginationResponse<Workforce>> {
    return this.masterService.getWorkforce(query);
  }

  @Get('/selection/company')
  getCompany(
    @Query() query: QuerySelectionDto,
  ): Promise<PaginationResponse<Company>> {
    return this.masterService.getCompany(query);
  }
}
