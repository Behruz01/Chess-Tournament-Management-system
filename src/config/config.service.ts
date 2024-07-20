import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('PORT', 1234);
  }

  get postgresUrl(): string {
    return this.configService.get<string>('POSTGRESQL_URL');
  }

  get jwtSecretKey(): string {
    return this.configService.get<string>('JWT_SECRET_KEY');
  }
}
