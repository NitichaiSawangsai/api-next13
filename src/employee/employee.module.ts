import { Module, forwardRef } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeGroup } from './entities/employee-group.entity';
import { EmployeeType } from './entities/employee-type.entity';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';
import { UserManagementModule } from '../user-management/user-management.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeType, EmployeeGroup]),
    forwardRef(() => AuthModule),
    forwardRef(() => HttpModule),
    forwardRef(() => UserManagementModule),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [],
})
export class EmployeeModule {}
