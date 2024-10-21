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
    this.get('/:id', ['PUBLIC'], cartController.getById);
    this.get('/', ['PUBLIC'], cartController.getAll);
    this.post('/', ['USER'], cartController.addProductToCart);
    this.put('/:cid/product/:pid', ['PUBLIC'], cartController.updateCart);
    this.post('/:cid/purchase', ['PUBLIC'], cartController.purchase);
  }
}
