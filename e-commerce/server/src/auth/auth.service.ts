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

  async loginUser(dto: UserDTO) {
    try {
      // check if any user with the given email exists in the database
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      // throw error if no user with the given email exists
      if (!user) {
        throw new ForbiddenException('Credentials Invalid');
      }
      // check if the password given is correct
      const isPasswordCorrect = await bcrypt.compare(dto.password, user.hash);
      console.log(isPasswordCorrect);
      // throw error if the password doesn't match
      if (!isPasswordCorrect) {
        throw new ForbiddenException('Credentials Invalid');
      }

      // password matches - send the access_token to frontend
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwt.signAsync(payload, {
          secret: this.config.get('JWT_SECRET'),
          expiresIn: '60m',
        }),
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Credentials Invalid');
      }

      throw error;
    }
  }
}
