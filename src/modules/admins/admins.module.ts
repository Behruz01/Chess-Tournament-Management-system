import { Module } from '@nestjs/common';
import { AdminService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/database/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [AdminsController],
  providers: [AdminService],
})
export class AdminsModule {}