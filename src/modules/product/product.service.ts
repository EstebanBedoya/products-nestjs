/**@package */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/**@module */
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schema/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productDocument: Model<ProductDocument>,
  ) {}

  async create(userId: string, createProductDto: CreateProductDto) {
    const newProduct = { ...createProductDto, owner: userId };
    return this.productDocument.create(newProduct);
  }

  async findAll(userId: string) {
    const products = await this.productDocument
      .find({ owner: userId })
      .populate('owner');

    if (!products) {
      throw new NotFoundException('Product not found');
    }

    return products;
  }

  async findById(id: string) {
    const product = await this.productDocument
      .findOne({ id })
      .populate('owner');
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: string, userId: string, updateProductDto: UpdateProductDto) {
    const product = await this.productDocument.findOne({ id });
    if (product.owner.toString() !== userId) {
      throw new UnauthorizedException('You are not the owner of this product');
    }

    return this.productDocument.findOneAndUpdate({ id }, updateProductDto, {
      new: true,
    });
  }

  async remove(id: string, userId: string) {
    const product = await this.productDocument.findOne({ id });
    if (product.owner.toString() !== userId) {
      throw new UnauthorizedException('You are not the owner of this product');
    }

    return this.productDocument.findOneAndDelete({ id });
  }
}
