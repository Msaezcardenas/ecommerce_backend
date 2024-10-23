import CartController from '../controllers/carts.controller.js';
import CustomRouter from './customRouter.js';

const cartController = new CartController();
export default class CartRouteCustom extends CustomRouter {
  init() {
    this.get('/:id', ['PUBLIC'], cartController.getById);
    this.get('/', ['PUBLIC'], cartController.getAll);
    this.post('/', ['USER'], cartController.addProductToCart);
    this.put('/:cid/product/:pid', ['PUBLIC'], cartController.updateCart);
    this.post('/:cid/purchase', ['PUBLIC'], cartController.purchase);
  }
}
