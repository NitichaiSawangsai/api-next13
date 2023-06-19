import { Module, forwardRef } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectType } from './entities/project-type.entity';
import { ProjectGroup } from './entities/project-group.entity';
import { ProjectStatus } from './entities/project-status.entity';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';
import { UserManagementModule } from '../user-management/user-management.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectType, ProjectGroup, ProjectStatus]),
    forwardRef(() => AuthModule),
    forwardRef(() => HttpModule),
    forwardRef(() => UserManagementModule),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [TypeOrmModule],
})
export class ProjectModule {}
