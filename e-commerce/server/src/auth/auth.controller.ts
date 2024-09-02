import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/UserDTO';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  registerUser(@Body() userDTO: UserDTO) {
    return this.auth.registerUser(userDTO);
  }
}
