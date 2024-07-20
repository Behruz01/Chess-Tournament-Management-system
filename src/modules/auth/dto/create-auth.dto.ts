import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'johndoe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LogoutDto {
  @ApiProperty({
    example:
      'cskjabekcnsk;ljnckjszncl;kzdjbnsc;lkndszlkcvjbdszvjbsodjbvkjnszcbn;sdklnckszd;jb',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
