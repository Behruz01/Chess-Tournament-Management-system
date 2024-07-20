import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from 'src/database/entities/users.entity';
import { UsersRepo } from 'src/database/repositories/users.repo';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UsersEntity) private readonly adminRepo: UsersRepo,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<{ message: string }> {
    try {
      const { email, password } = createAdminDto;

      const findAdmin = await this.adminRepo.findOne({ where: { email } });
      if (findAdmin) {
        throw new HttpException('Admin already exists!', HttpStatus.CONFLICT);
      }

      const hashPass = await bcrypt.hash(password, 12);

      const data = this.adminRepo.create({
        email,
        password: hashPass,
        role: 'admin',
      });
      await this.adminRepo.save(data);

      return { message: 'Created admin successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An unexpected error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<UsersEntity[]> {
    try {
      const data = await this.adminRepo.find({ where: { role: 'admin' } });
      return data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An unexpected error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<UsersEntity> {
    try {
      const findAdmin = await this.adminRepo.findOne({ where: { id } });
      if (!findAdmin) {
        throw new HttpException('Admin not found!', HttpStatus.NOT_FOUND);
      }

      return findAdmin;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An unexpected error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateAdminDto: UpdateAdminDto,
  ): Promise<{ message: string }> {
    try {
      const findAdmin = await this.adminRepo.findOne({ where: { id } });
      if (!findAdmin) {
        throw new HttpException('Admin not found!', HttpStatus.NOT_FOUND);
      }

      const { email, password } = updateAdminDto;

      let updatedData: Partial<UpdateAdminDto> = { email };

      if (password) {
        const hashPass = await bcrypt.hash(password, 12);
        updatedData = { ...updatedData, password: hashPass };
      }

      await this.adminRepo.update({ id }, updatedData);
      return { message: 'Updated admin successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An unexpected error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const findAdmin = await this.adminRepo.findOne({ where: { id } });
      if (!findAdmin) {
        throw new HttpException('Admin not found!', HttpStatus.NOT_FOUND);
      }

      await this.adminRepo.delete({ id });
      return { message: 'Deleted admin successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An unexpected error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
