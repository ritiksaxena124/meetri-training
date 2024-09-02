import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/UserDTO';

@Injectable()
export class AuthService {
  registerUser(userDTO: UserDTO) {
    return {
      data: userDTO,
    };
  }
}
