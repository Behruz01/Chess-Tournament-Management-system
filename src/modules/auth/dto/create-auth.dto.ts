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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4ODYwODliLTU3ZjAtNDY3MS1hODM0LTEyNDQ5MjVjZWU2MiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMTQ1NzY4NSwiZXhwIjoxNzIxNDU4Mjg1fQ.jJTVBkNTntKgaJrOw9bInsJEIoNyVk6E1bZY6cp6g20',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
