import {
  Controller,
  Get,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { QuerySelectionDto } from '../common/dtos/selection.dto';
import { PaginationResponse } from '../common/interface/pagination.interface';
import { ProjectType } from './entities/project-type.entity';
import { ProjectGroup } from './entities/project-group.entity';
import { ProjectStatus } from './entities/project-status.entity';
import { UserAuthGuard } from '../auth/guards/user-auth-guard.guard';

@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@ApiTags('Projects')
@Controller('api/v1/projects')
@UsePipes(new ValidationPipe({ transform: true }))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/selection/type')
  getProjectType(
    @Query() query: QuerySelectionDto,
  ): Promise<PaginationResponse<ProjectType>> {
    return this.projectService.getProjectType(query);
  }

  @Get('/selection/group')
  getProjectGroup(
    @Query() query: QuerySelectionDto,
  ): Promise<PaginationResponse<ProjectGroup>> {
    return this.projectService.getProjectGroup(query);
  }

  @Get('/selection/status')
  getProjectStatus(
    @Query() query: QuerySelectionDto,
  ): Promise<PaginationResponse<ProjectStatus>> {
    return this.projectService.getProjectStatus(query);
  }
}
