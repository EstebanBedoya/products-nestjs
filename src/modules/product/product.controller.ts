/**@package */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

/**@module */
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';

/**@application */
import { AuthUser } from '../../common/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResponseDto } from '../../common/dtos/response.dto';
import { UserEntity } from '../../common/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @AuthUser() { userId }: UserEntity,
    @Body() createProductDto: CreateProductDto,
  ) {
    const product = await this.productService.create(userId, createProductDto);
    return plainToClass(ResponseDto, {
      data: product,
      message: 'Product created successfully',
    });
  }

  @Get()
  async findAll(@AuthUser() { userId }: UserEntity) {
    const products = await this.productService.findAll(userId);

    return {
      data: products,
      message: 'Products listed successfully',
    } as ResponseDto;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const product = await this.productService.findById(id);

    return {
      data: product,
      message: 'Product retrieved successfully',
    };
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() update: UpdateProductDto,
    @AuthUser() { userId }: UserEntity,
  ) {
    const product = await this.productService.update(id, userId, update);
    return plainToClass(ResponseDto, {
      data: product,
      message: 'Product updated successfully',
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @AuthUser() { userId }: UserEntity) {
    await this.productService.remove(id, userId);
    return plainToClass(ResponseDto, {
      message: 'Product deleted successfully',
    });
  }
}
