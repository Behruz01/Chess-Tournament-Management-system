import { PartialType } from '@nestjs/swagger';
import { CreateTourmentDto } from './create-tourment.dto';

export class UpdateTourmentDto extends PartialType(CreateTourmentDto) {}
