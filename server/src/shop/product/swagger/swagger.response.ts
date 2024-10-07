import { ApiResponseOptions } from '@nestjs/swagger';
import { ProductDto } from '../dto/product.dto';

// Get Products Response
export const getProductsApiResponse: ApiResponseOptions[] = [
  {
    status: 200,
    description: 'Get all products',
  },
  {
    status: 404,
    description: 'No products found',
  },
];

// Single Product Response
export const getSingleProductApiResponse: ApiResponseOptions[] = [
  {
    status: 200,
    description: 'Get single product',
    type: ProductDto,
  },
  {
    status: 404,
    description: 'Product not found',
  },
];
