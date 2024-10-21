import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class registerUserDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  phone: string;

  // @IsString()
  // @IsOptional()
  // address: {
  //   state: string;
  //   pincode: string;
  // };
}
