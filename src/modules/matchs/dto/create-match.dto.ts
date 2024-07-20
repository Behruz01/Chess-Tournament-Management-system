import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateMatchDto {
  @ApiProperty({
    example: '2a184236-6846-42b0-aa64-672e318cd8e8',
  })
  @IsUUID()
  @IsNotEmpty()
  tourment_id: string;

  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  round: number;
}
