import ProductController from '../controllers/product.controller.js';
import CustomRouter from './customRouter.js';

export default class ProductRouterCustom extends CustomRouter {
  init() {
    const productController = new ProductController();
    this.get('/', ['ADMIN'], productController.getAll);
    this.get('/:id', ['ADMIN'], productController.getById);
    this.post('/', ['ADMIN'], productController.create);
    this.put('/:id', ['ADMIN'], productController.update);
    this.delete('/:id', ['ADMIN'], productController.delete);
  }
}
