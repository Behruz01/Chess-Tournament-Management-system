import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMatchDto } from './create-match.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateMatchDto extends PartialType(CreateMatchDto) {
  @ApiProperty({
    example: 12,
  })
  @IsNumber()
  @IsNotEmpty()
  first_player_score: number;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  second_player_score: number;

  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  round: number;
}
