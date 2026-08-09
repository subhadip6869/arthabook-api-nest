import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { FirebaseUserPrincipal } from './firebase-user-principal';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authorization = request.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authentication required');
    }

    const token = authorization.substring(7);

    try {
      const decodedToken = await getAuth().verifyIdToken(token);

      request.user = new FirebaseUserPrincipal(
        decodedToken.uid,
        decodedToken.email!,
        decodedToken.email_verified ?? false,
      );

      return true;
    } catch {
      throw new UnauthorizedException('Invalid Firebase Token');
    }
  }
}
