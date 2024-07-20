import { JwtPayload } from 'jsonwebtoken';
export interface CustomError {
  message: string;
  status?: number;
}

export interface ExtendedJwtPayload extends JwtPayload {
  id: string;
}
