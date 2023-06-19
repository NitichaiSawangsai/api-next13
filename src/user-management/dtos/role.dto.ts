import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

@Exclude()
export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;
}

export class QueryRoleDto {
  @ApiPropertyOptional({ example: 'menus' })
  @IsString()
  @IsOptional()
  relations?: string;
}
