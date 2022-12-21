/**@package */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

/**@module */
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ProductModule,
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/nest'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
