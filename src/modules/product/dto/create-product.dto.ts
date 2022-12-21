/** @package */
import { OmitType } from '@nestjs/mapped-types';

/** @module */
import { ProductDto } from './product.dto';

export class CreateProductDto extends OmitType(ProductDto, [
  'owner',
] as const) {}
