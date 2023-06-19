import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import {
  MenuLevel,
  MenuStatusType,
  MenuUrlType,
} from '../user-management.enum';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@Exclude()
export class CreateMenuDto {
  @ApiProperty({
    enum: MenuLevel,
    example: Object.values(MenuLevel).join('|'),
  })
  @IsNotEmpty()
  @IsEnum(MenuLevel)
  @Expose()
  level: MenuLevel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Expose()
  parentId?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  url: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  icon?: string;

  @ApiPropertyOptional({
    enum: MenuUrlType,
    example: Object.values(MenuUrlType).join('|'),
  })
  @IsOptional()
  @IsEnum(MenuUrlType)
  @Expose()
  urlType: MenuUrlType;

  @ApiProperty({
    enum: MenuStatusType,
    example: Object.values(MenuStatusType).join('|'),
  })
  @IsNotEmpty()
  @IsEnum(MenuStatusType)
  @Expose()
  status: MenuStatusType;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  editable: boolean;
}

export class QueryMenuDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: Boolean, name: 'with-parent' })
  @IsBoolean()
  @IsOptional()
  @Expose({ name: 'with-parent' })
  @Transform(({ value }) => value == 1 || value === 'true')
  withParent?: boolean;

  @ApiPropertyOptional({ type: Boolean, name: 'with-child' })
  @IsBoolean()
  @IsOptional()
  @Expose({ name: 'with-child' })
  @Transform(({ value }) => value == 1 || value === 'true')
  withChild?: boolean;

  @ApiPropertyOptional({ enum: MenuLevel })
  @IsEnum(MenuLevel)
  @IsOptional()
  level?: MenuLevel;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  @Expose()
  @Transform(({ value }) => value == 1 || value === 'true')
  editable?: boolean;

  @ApiPropertyOptional({
    name: 'order-by',
    example:
      'menu.parentId:asc,menu.orderNo:asc,menu.id:asc,roles.id:asc,user.id:asc',
  })
  @IsString()
  @IsOptional()
  @Expose({ name: 'order-by' })
  orderBy?: string;
}
