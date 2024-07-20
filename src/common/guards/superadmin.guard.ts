import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomError } from '../interfaces/custom.interface';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const { role } = request.user;

      if (role !== 'superAdmin') return false;

      return true;
    } catch (error) {
      const customError = error as CustomError;
      throw new HttpException(
        customError.message,
        customError.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
