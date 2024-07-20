import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateLeaderboardDto {
  @ApiProperty({
    example: '2a184236-6846-42b0-aa64-672e318cd8e8',
  })
  @IsUUID()
  @IsNotEmpty()
  tournament_id: string;
}
