import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  products: {
    type: [
      {
        quantity: {
          type: Number,
          default: 0,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
        },
      },
    ],
    default: [],
  },
});

export const CartModel = model('carts', cartSchema);
