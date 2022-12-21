/** @package */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

/** @application */
import { User } from '../../../common/schemas/user.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  toJSON: {
    virtuals: true,
    transform: function (_, ret: any) {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Product {
  @Prop({ unique: true, required: true })
  id: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({ required: true, ref: 'User', type: MongooseSchema.Types.ObjectId })
  owner: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
