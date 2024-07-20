import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TourmentsModule } from './modules/tourments/tourments.module';
import { AdminsModule } from './modules/admins/admins.module';
import { AuthMiddleware } from './common/middlewares/tokenchecker.middleware';
import { MyConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.example',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRESQL_URL,
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
      entities: [],
    }),
    AuthModule,
    TourmentsModule,
    AdminsModule,
    MyConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/auth/login', method: RequestMethod.POST },
        { path: '/auth/superadminlogin', method: RequestMethod.POST },
        { path: '/auth/refresh-token', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
