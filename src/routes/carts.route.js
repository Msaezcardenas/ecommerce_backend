// import { Router } from 'express';
// import { getCartById, createCart, updateCart } from '../controllers/carts.controller.js';
import CartController from '../controllers/carts.controller.js';
import CustomRouter from './customRouter.js';

const cartController = new CartController();
// const app = Router();

// app.get('/:cid', getCartById);
// app.post('/', createCart);
// app.put('/:cid/products/:pid', updateCart);

// export default app;

export default class CartRouteCustom extends CustomRouter {
  init() {
    this.post('/', ['PUBLIC'], cartController.create);
    this.get('/:id', ['PUBLIC'], cartController.getById);
    this.get('/', ['PUBLIC'], cartController.getAll);
    this.put('/:cid/product/:pid', ['PUBLIC'], cartController.updateCart);
  }
}
