import { Router } from 'express';
import { CartModel } from '../models/cart.model.js';

const router = Router();

// router.get('/:cid', async (req, res) => {
//   console.log('ingresa a get cart by id');

//   try {
//     const { cid } = req.params;
//     const cart = await CartModel.findById(cid).populate('products.product');
//     console.log({ cart });

//     res.status(200).json({ data: cart });
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });

export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartModel.findById(cid).populate('products.product');
    console.log({ cart });
    res.status(200).json({ data: cart });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const createCart = async (req, res) => {
  try {
    const newCart = await CartModel.create({
      products: [],
    });
    res.status(201).json({ data: newCart });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
