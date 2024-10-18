// import { Router } from 'express';
// import { CartModel } from '../models/cart.model.js';

// const router = Router();

// export const getCartById = async (req, res) => {
//   try {
//     const { cid } = req.params;
//     const cart = await CartModel.findById(cid).populate('products.product');
//     console.log({ cart });
//     res.status(200).json({ data: cart });
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// };

// export const createCart = async (req, res) => {
//   try {
//     const newCart = await CartModel.create({
//       products: [],
//     });
//     console.log(newCart);
//     res.status(201).json({ data: newCart });
//   } catch (error) {
//     res.status(400).send({ error: error.message, newCart });
//   }
// };

// export const updateCart = async (req, res) => {
//   const { cid, pid } = req.params;

//   const cartFinded = await CartModel.findById(cid);
//   if (!cartFinded) res.status(404).json({ message: 'error' });

//   const indexProd = cartFinded.products.findIndex((prod) => prod.product.toString() === pid);
//   if (indexProd === -1) {
//     cartFinded.products.push({ product: pid, quantity: 1 });
//   } else {
//     cartFinded.products[indexProd] = {
//       product: cartFinded.products[indexProd].product,
//       quantity: cartFinded.products[indexProd].quantity + 1,
//     };
//   }
//   const cartUpdated = await CartModel.findByIdAndUpdate(cid, cartFinded, {
//     new: true,
//   }).populate('products.product');

//   res.status(201).json({ message: 'Product Added', cart: cartUpdated });
// };

import CartService from '../services/cart.services.js';
import { createResponse } from '../utils.js';
import BaseController from './baseController.js';

const cartService = new CartService();

export default class CartController extends BaseController {
  constructor() {
    super(cartService);
  }

  updateCart = async (req, res, next) => {
    try {
      console.log('---------->', req.params);

      const data = await this.service.updateCart(req.params);
      !data ? createResponse(res, 404, data) : createResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  };
}
