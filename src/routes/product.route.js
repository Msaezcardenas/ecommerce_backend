import ProductController from '../controllers/product.controller.js';
import CustomRouter from './customRouter.js';

export default class ProductRouterCustom extends CustomRouter {
  init() {
    const productController = new ProductController();
    this.post('/', ['PUBLIC'], productController.create);
    this.get('/', ['ADMIN'], productController.getAll);
  }
}
