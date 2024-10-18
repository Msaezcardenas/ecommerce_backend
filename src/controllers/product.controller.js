import ProductService from '../services/product.services.js';
import BaseController from './baseController.js';

const productService = new ProductService();

export default class ProductController extends BaseController {
  constructor() {
    super(productService);
  }
}
