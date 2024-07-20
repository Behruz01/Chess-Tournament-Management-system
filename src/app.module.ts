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
import { UsersEntity } from './database/entities/users.entity';
import { PlayersEntity } from './database/entities/players.entity';
import { TourmentEntity } from './database/entities/tourment.entity';
import { LeaderboardEntity } from './database/entities/leaderboard.entity';
import { MatchsEntity } from './database/entities/match.entity';
import { TourmentParticipantsEntity } from './database/entities/tournamentParticipants.entity';
import { PlayersModule } from './modules/players/players.module';
import { TourmentParticipantsModule } from './modules/tourment-participants/tourment-participants.module';
import { MatchsModule } from './modules/matchs/matchs.module';

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
      entities: [
        UsersEntity,
        PlayersEntity,
        TourmentEntity,
        LeaderboardEntity,
        MatchsEntity,
        TourmentParticipantsEntity,
      ],
    }),
    AuthModule,
    TourmentsModule,
    AdminsModule,
    MyConfigModule,
    PlayersModule,
    TourmentParticipantsModule,
    MatchsModule,
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
