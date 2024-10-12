import Services from './services.js';
import ProductAccessMongo from '../models/product.dao.js';

const productDAO = new ProductAccessMongo();

export default class ProductService extends Services {
  constructor() {
    super(productDAO);
  }
}
