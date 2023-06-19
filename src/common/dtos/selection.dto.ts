import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class QuerySelectionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  query?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number.parseInt(value) || undefined)
  page?: number;

  @ApiPropertyOptional({ name: 'per-page' })
  @IsOptional()
  @IsInt()
  @Expose({ name: 'per-page' })
  @Transform(({ value }) => Number.parseInt(value) || undefined)
  perPage?: number;
}
