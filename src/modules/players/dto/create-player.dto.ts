import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  player_name: string;

  @ApiProperty({
    example: '2002-07-20',
  })
  @IsDateString()
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({
    example: 'USA',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    example: 12,
  })
  @IsNumber()
  @IsNotEmpty()
  points: number;
}
