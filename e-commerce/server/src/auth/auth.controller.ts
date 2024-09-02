import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/dto/UserDTO';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  registerUser(@Body() dto: UserDTO) {
    return this.auth.registerUser(dto);
  }
}
