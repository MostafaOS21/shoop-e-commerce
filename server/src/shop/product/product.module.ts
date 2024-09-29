import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { ProductProvider } from 'src/dashboard/product/entities/product.provider';
import { CartProvider } from '../entities/cart.provider';
import { UserProvider } from 'src/auth/entities/user.provider';
import { WishProvider } from '../entities/wishlist.provider';
import { ProductController } from './product.controller';

@Module({
  providers: [
    ProductResolver,
    ProductService,
    ProductProvider,
    CartProvider,
    UserProvider,
    WishProvider,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
