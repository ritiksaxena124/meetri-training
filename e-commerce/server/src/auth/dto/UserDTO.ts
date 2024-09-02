import { AddressDTO } from './AddressDTO';
import { ProductDTO } from './ProductDTO';

export class UserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  hash: string;
  userRole: string;
  phoneNumber: string;
  address: AddressDTO[];
  cart: ProductDTO[];
  createdAt: Date;
  updatedAt: Date;
}
