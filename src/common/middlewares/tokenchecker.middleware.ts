import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { MyConfigService } from 'src/config/config.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: MyConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, this.configService.jwtSecretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      req['user'] = user;
      next();
    });
  }
}
