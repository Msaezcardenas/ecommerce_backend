import Services from './services.js';
import ProductRepository from '../repositories/product.repository.js';

const productRepository = new ProductRepository();

export default class ProductService extends Services {
  constructor() {
    super(productRepository);
  }
}
