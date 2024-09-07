import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDTO, loginUserDTO } from 'src/dto';
import { Response } from 'express';
import { RequestInterceptor } from 'src/interceptors/request.interceptor';

@UseInterceptors(RequestInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

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
