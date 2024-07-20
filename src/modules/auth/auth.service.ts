import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, LogoutDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { MyConfigService } from 'src/config/config.service';
import { UsersEntity } from 'src/database/entities/users.entity';
import { UsersRepo } from 'src/database/repositories/users.repo';
import { createClient } from 'redis';
import {
  CustomError,
  ExtendedJwtPayload,
} from 'src/common/interfaces/custom.interface';
import { userObject } from 'src/common/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepo,
    private configService: MyConfigService,
  ) {}

  createAccessToken(user: userObject): string {
    return jwt.sign(
      { id: user.id, role: user.role },
      this.configService.jwtSecretKey,
      {
        expiresIn: '10m',
      },
    );
  }

  async createRefreshToken(user: userObject): Promise<string> {
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      this.configService.jwtSecretKey,
      {
        expiresIn: '10h',
      },
    );

    const payload = jwt.verify(
      refreshToken,
      this.configService.jwtSecretKey,
    ) as ExtendedJwtPayload;
    const key = `${payload.id}:refreshToken`;

    await client.set(key, refreshToken, { EX: 86400 });

    await client.disconnect();

    return refreshToken;
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = loginDto;
    const findUser = await this.userRepo.findOne({ where: { email } });

    if (!findUser)
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    const verifyPass = await bcrypt.compare(password, findUser.password);
    if (!verifyPass)
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);

    const accessToken = this.createAccessToken(findUser);
    const refreshToken = await this.createRefreshToken(findUser);
    return { accessToken, refreshToken };
  }

  async logout(logoutDto: LogoutDto): Promise<{ message: string }> {
    const { refreshToken } = logoutDto;

    if (!refreshToken) {
      throw new HttpException(
        'Token is required for logout',
        HttpStatus.BAD_REQUEST,
      );
    }

    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();

    const payload = jwt.verify(
      refreshToken,
      this.configService.jwtSecretKey,
    ) as ExtendedJwtPayload;
    const key = `${payload.id}:refreshToken`;
    const redisResult = await client.del(key);

    if (redisResult === 0) {
      throw new HttpException(
        'Failed to remove token from Redis',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await client.disconnect();
    return { message: 'Logout successful' };
  }

  async register(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = loginDto;
    const findUser = await this.userRepo.findOne({ where: { email } });

    if (findUser)
      throw new HttpException('User already exists!', HttpStatus.CONFLICT);

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = this.userRepo.create({ email, password: hashedPassword });
    await this.userRepo.save(newUser);

    const accessToken = this.createAccessToken(newUser);
    const refreshToken = await this.createRefreshToken(newUser);
    return { accessToken, refreshToken };
  }

  async refresh(tokenDto: LogoutDto): Promise<{ accessToken: string }> {
    const { refreshToken } = tokenDto;

    if (!refreshToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();

    const payload = jwt.verify(
      refreshToken,
      this.configService.jwtSecretKey,
    ) as ExtendedJwtPayload;
    const key = `${payload.id}:refreshToken`;
    const storedToken = await client.get(key);

    if (!storedToken || storedToken !== refreshToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const newAccessToken = this.createAccessToken(payload);
    await client.disconnect();

    return { accessToken: newAccessToken };
  }

  async superadminLogin(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const { email, password } = loginDto;

      const hashPass = await bcrypt.hash(password, 12);
      if (
        email === 'ibragimovbehruz822@gmail.com' &&
        password === 'superadmin'
      ) {
        const findSuperAdmin = await this.userRepo.findOne({
          where: { email },
        });
        if (!findSuperAdmin) {
          const superAdmin = this.userRepo.create({
            email,
            password: hashPass,
            role: 'superAdmin',
          });
          await this.userRepo.save(superAdmin);
        }
      }

      const findAdmin = await this.userRepo.findOne({ where: { email } });
      if (!findAdmin)
        throw new HttpException('Admin not found!', HttpStatus.BAD_REQUEST);

      const verifyPass = await bcrypt.compare(password, findAdmin.password);
      if (!verifyPass) {
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
      }

      const accessToken = this.createAccessToken(findAdmin);
      const refreshToken = await this.createRefreshToken(findAdmin);
      return { accessToken, refreshToken };
    } catch (error) {
      const customError = error as CustomError;
      throw new HttpException(
        customError.message,
        customError.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
