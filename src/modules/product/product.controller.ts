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
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

/**@module */
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';

/**@application */
import { AuthUser } from '../../common/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResponseDto } from '../../common/dtos/response.dto';
import { UserEntity } from '../../common/entities/user.entity';

@ApiTags('Product')
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new product',
    description: 'Only authenticated users can create products',
  })
  @ApiBody({ type: CreateProductDto })
  @ApiNotFoundResponse({ description: 'Products not found' })
  @ApiOkResponse({
    description: 'Products loaded correctly',
    type: ResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
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

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List all products',
    description: 'List all products of the authenticated user',
  })
  @ApiNotFoundResponse({ description: 'Products not found' })
  @ApiOkResponse({
    description: 'Products listed correctly',
    type: ResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get()
  async findAll(@AuthUser() { userId }: UserEntity) {
    const products = await this.productService.findAll(userId);

    return {
      data: products,
      message: 'Products listed successfully',
    } as ResponseDto;
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get a product',
    description: 'Get a product by id',
  })
  @ApiParam({ name: 'id', type: String, description: 'Product id' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @ApiOkResponse({
    description: 'Product retrieved successfully',
    type: ResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    const product = await this.productService.findById(id);

    return {
      data: product,
      message: 'Product retrieved successfully',
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a product',
    description:
      'Update a product by id, only the owner can update the product',
  })
  @ApiParam({ name: 'id', type: String, description: 'Product id' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @ApiOkResponse({
    description: 'Product updated successfully',
    type: ResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
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

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a product',
    description:
      'Delete a product by id, only the owner can update the product',
  })
  @ApiParam({ name: 'id', type: String, description: 'Product id' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @ApiOkResponse({
    description: 'Product deleted successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Delete(':id')
  async remove(@Param('id') id: string, @AuthUser() { userId }: UserEntity) {
    await this.productService.remove(id, userId);
    return plainToClass(ResponseDto, {
      message: 'Product deleted successfully',
    });
  }
}
