import { Module, forwardRef } from '@nestjs/common';
import { MasterController } from './master.controller';
import { MasterService } from './master.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScgDepartment } from './entities/scg-department.entity';
import { DoDepartment } from './entities/do-department.entity';
import { ScgPosition } from './entities/scg-position.entity';
import { Section } from './entities/section.entity';
import { SubDivision } from './entities/sub-division.entity';
import { Workforce } from './entities/workforce.entity';
import { Company } from './entities/company.entity';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';
import { UserManagementModule } from '../user-management/user-management.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      DoDepartment,
      ScgDepartment,
      ScgPosition,
      Section,
      SubDivision,
      Workforce,
      Company,
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => HttpModule),
    forwardRef(() => UserManagementModule),
  ],
  controllers: [MasterController],
  providers: [MasterService],
  exports: [TypeOrmModule],
})
export class MasterModule {}
