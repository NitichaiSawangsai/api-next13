import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail, Matches } from 'class-validator';

@Exclude()
export class LoginDto {
  @ApiProperty({ example: '*@scg.com' })
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[^\s@]+@scg\.com$/, {
    message: 'Email must end with @scg.com',
  })
  @Expose()
  email: string;

  //!
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // @Expose()
  // password: string;
}
