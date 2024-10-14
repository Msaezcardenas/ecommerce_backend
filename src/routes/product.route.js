import ProductController from '../controllers/product.controller.js';
import CustomRouter from './customRouter.js';

export default class ProductRouterCustom extends CustomRouter {
  init() {
    const productController = new ProductController();
    this.post('/', ['ADMIN'], productController.create);
    this.get('/', ['ADMIN'], productController.getAll);
    this.put('/:id', ['PUBLIC'], productController.update);
    this.get('/:id', ['PUBLIC'], productController.getById);
    this.delete('/:id', ['PUBLIC'], productController.delete);
  }
}
