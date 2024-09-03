import {
  Injectable,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Gives access to request
    const request = context.switchToHttp().getRequest();
    // extract the token from the request header
    const token = this.extractTokenFromHeader(request);
    // if token not present - throw unauthorized error
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }
    try {
      // check if the token is a valid token
      const payload = await this.jwt.verifyAsync(token, {
        secret: this.config.get('JWT_SECRET'),
      });
      // throw error if the token recieved is not valid
      if (!payload) {
        throw new UnauthorizedException('Invalid token');
      }
      // else attach the payload to request.user object
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    return true;
  }

  private extractTokenFromHeader(@Req() request: Request): string | undefined {
    const [type, token] =
      (request.headers.authorization?.split(' ') ||
        request.cookies['access_token']?.split(' ')) ??
      [];
    return type === 'Bearer' ? token : undefined;
  }
}
