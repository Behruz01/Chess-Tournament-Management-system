import { Module } from '@nestjs/common';
import { MyConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [MyConfigService],
  exports: [MyConfigService],
})
export class MyConfigModule {}
