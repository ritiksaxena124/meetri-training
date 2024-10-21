import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcryptjs';
import { loginUserDTO, registerUserDTO } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { SALT_ROUNDS } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async registerUser(dto: registerUserDTO) {
    // Hash the password
    const hash: string = await bcrypt.hash(dto.password, SALT_ROUNDS);
    try {
      // create a user and save hash in-place of original password
      const user = await this.prisma.user.create({
        data: {
          firstName: dto?.firstName,
          lastName: dto?.lastName || '',
          email: dto?.email,
          hash: hash,
          phone: dto?.phone || '',
          // address: dto?.address || '',
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
        msg: 'User registered successfully',
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

  async loginUser(dto: loginUserDTO, response: Response) {
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

      // throw error if the password doesn't match
      if (!isPasswordCorrect) {
        throw new ForbiddenException('Credentials Invalid');
      }

      // password matches - send the access_token to frontend
      const payload = { sub: user.id, email: user.email };
      const access_token = await this.jwt.signAsync(payload, {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: '60m',
      });

      response.cookie('access_token', `Bearer ${access_token}`, {
        httpOnly: true,
        secure: true,
        sameSite: false,
      });

      return {
        msg: 'User logged in successfully',
        access_token,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Credentials Invalid');
      }

      throw error;
    }
  }
}
