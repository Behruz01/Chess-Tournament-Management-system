import { PartialType } from '@nestjs/swagger';
import { CreateTourmentParticipantDto } from './create-tourment-participant.dto';

export class UpdateTourmentParticipantDto extends PartialType(CreateTourmentParticipantDto) {}
