/**@package */
import { PartialType } from '@nestjs/mapped-types';

/**@module */
import { ProductDto } from './product.dto';

export class UpdateProductDto extends PartialType(ProductDto) {}
