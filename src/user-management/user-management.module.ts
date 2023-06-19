import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { MenuService } from './services/menu.service';
import { Menu } from './entities/menu.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { RoleService } from './services/role.service';
import { UserManagementController } from './user-management.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Menu]),
    forwardRef(() => AuthModule),
    forwardRef(() => HttpModule),
  ],
  controllers: [UserManagementController],
  providers: [UserService, MenuService, RoleService],
  exports: [UserService, MenuService, RoleService],
})
export class UserManagementModule {}
