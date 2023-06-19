import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Menu } from './entities/menu.entity';
import { MenuService } from './services/menu.service';
import { CreateMenuDto, QueryMenuDto } from './dtos/menu.dto';
import { CreateUserDto, QueryUserDto } from './dtos/user.dto';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { CreateRoleDto, QueryRoleDto } from './dtos/role.dto';
import { RoleService } from './services/role.service';
import { Role } from './entities/role.entity';
import { UserReq } from '../common/custom-decorators/auth.custom-decorators';
import { UserAuthGuard } from '../auth/guards/user-auth-guard.guard';

@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@ApiTags('UserManagement')
@Controller('api/v1/management/')
@UsePipes(new ValidationPipe({ transform: true }))
export class UserManagementController {
  constructor(
    private readonly menuService: MenuService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  //** MENU */
  @ApiCreatedResponse()
  @Post('menu')
  createMenu(
    @UserReq() user: User,
    @Body()
    dto: CreateMenuDto,
  ): Promise<Menu> {
    return this.menuService.createMenu(user, dto);
  }

  @ApiOkResponse()
  @Get('menus')
  getMenus(
    @UserReq() user: User,
    @Query() query: QueryMenuDto,
  ): Promise<Menu[]> {
    return this.menuService.getMenus(user, query);
  }

  //** USER */
  @ApiCreatedResponse()
  @Post('user')
  createUser(
    @UserReq() user: User,
    @Body()
    dto: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(user, dto);
  }

  @ApiOkResponse()
  @Get('user')
  getUser(@UserReq() user: User, @Query() query: QueryUserDto): Promise<User> {
    return this.userService.getUser(user, query);
  }

  //** ROLE */
  @ApiCreatedResponse()
  @Post('role')
  createRole(
    @UserReq() user: User,
    @Body()
    query: CreateRoleDto,
  ): Promise<Role> {
    return this.roleService.createRole(user, query);
  }

  @ApiOkResponse()
  @Get('roles')
  getRoles(@Query() query: QueryRoleDto) {
    return this.roleService.getRoles(query);
  }
}
