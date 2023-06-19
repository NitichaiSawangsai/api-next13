import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  Matches,
} from 'class-validator';
import { UserStatusType } from '../user-management.enum';

@Exclude()
export class CreateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Expose()
  roleId?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ example: '*.@scg.com' })
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[^\s@]+@scg\.com$/, {
    message: 'Email must end with @scg.com',
  })
  @Expose()
  email: string;

  @ApiPropertyOptional({
    enum: UserStatusType,
    example: Object.values(UserStatusType).join('|'),
  })
  @IsOptional()
  @IsEnum(UserStatusType)
  @Expose()
  status: UserStatusType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  avatar?: string;
}

export class QueryUserDto {
  @ApiPropertyOptional({
    example:
      'user.role,user1.menus,user2.children,user3.children,user4.children,user5.children',
  })
  @IsString()
  @IsOptional()
  relations?: string;

  @ApiPropertyOptional({
    name: 'order-by',
    example:
      'user2.orderNo:asc,user2.id:asc,user3.orderNo:asc,user3.id:asc,user4.orderNo:asc,user4.id:asc,user5.orderNo:asc,user5.id:asc',
  })
  @IsString()
  @IsOptional()
  @Expose({ name: 'order-by' })
  orderBy?: string;
}
