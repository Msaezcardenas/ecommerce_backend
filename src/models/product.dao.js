import MongoDao from './dao.js';
import { ProductModel } from './product.model.js';

export default class ProductAccessMongo extends MongoDao {
  constructor() {
    super(ProductModel);
  }
}
