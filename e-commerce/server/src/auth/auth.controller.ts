import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDTO, loginUserDTO } from 'src/dto';
import { Response } from 'express';
import { RequestInterceptor } from 'src/interceptors/request.interceptor';
import { AuthGuard } from './guards/auth.guard';

@UseInterceptors(RequestInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('verify-auth')
  verifyAuth() {
    return {
      msg: 'User is authenticated',
    };
  }

  @Post('register')
  registerUser(@Body() dto: registerUserDTO) {
    return this.auth.registerUser(dto);
  }

  @Post('login')
  loginUser(
    @Body() dto: loginUserDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.auth.loginUser(dto, response);
  }
}
