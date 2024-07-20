import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTourmentParticipantDto {
  @ApiProperty({
    example: 'cb07f145-4c2e-4247-8fa8-7e168581db93',
  })
  @IsUUID()
  @IsNotEmpty()
  tourment_id: string;

  @ApiProperty({
    example: 'cb07f145-4c2e-4247-8fa8-7e168581db93',
  })
  @IsUUID()
  @IsNotEmpty()
  player_id: string;
}
