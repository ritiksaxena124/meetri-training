import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcryptjs';
import { UserDTO } from 'src/dto/UserDTO';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async registerUser(dto: UserDTO) {
    // Hash the password
    const hash: string = await bcrypt.hash(dto.password, 10);
    try {
      // create a user and save hash in-place of original password
      const user = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          hash: hash,
          phone: dto.phone,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      //   Check if registering the user is successfull or not
      if (!user) {
        throw new Error('Unable to register user');
      }

      const payload = { sub: user.id, email: user.email };

      // return the access_token
      return {
        access_token: await this.jwt.signAsync(payload, {
          secret: this.config.get('JWT_SECRET'),
          expiresIn: '60m',
        }),
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already taken');
        }
      }
      throw error;
    }
  }
}
