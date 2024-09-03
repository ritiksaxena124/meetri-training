import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDTO, loginUserDTO } from 'src/dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  registerUser(@Body() dto: registerUserDTO) {
    return this.auth.registerUser(dto);
  }

  @Post('login')
  loginUser(@Body() dto: loginUserDTO) {
    return this.auth.loginUser(dto);
  }
}
