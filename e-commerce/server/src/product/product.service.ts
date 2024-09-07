import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async allProducts() {
    const products = await this.prisma.product.findMany();
    if (!products) {
      throw new NotFoundException('Error fetching products');
    }

    return {
      products,
      total: products.length,
    };
  }

  async singleProduct(id) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      throw new NotFoundException('Invalid product id');
    }

    return product;
  }
}
