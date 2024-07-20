import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTourmentDto {
  @ApiProperty({
    example: 'Chess Championship',
  })
  @IsString()
  @IsNotEmpty()
  tourment_name: string;

  @ApiProperty({
    example: '2024-07-20 10:00:00',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty({
    example: '2024-07-25 18:00:00',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  end_date: Date;
}
