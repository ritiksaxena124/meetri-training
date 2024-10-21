import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private products: ProductService) {}
  @Get('all')
  getAllProducts() {
    return this.products.allProducts();
  }

  @Get('product/:id')
  getSingleProduct(@Param('id') id) {
    return this.products.singleProduct(id);
  }
}
