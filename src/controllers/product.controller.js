import ProductService from '../services/product.services.js';
import Controllers from './Controllers.js';

const productService = new ProductService();

export default class ProductController extends Controllers {
  constructor() {
    super(productService);
  }
}
