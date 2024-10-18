import BaseRepository from './base.repository.js';
import { ProductModel } from '../models/product.model.js';

// 4.- Este repositorio maneja las operaciones CRUD relacionadas
//     con los usuarios y encapsula el acceso directo a la base de datos.

export default class ProductRepository extends BaseRepository {
  constructor() {
    super(ProductModel);
  }
}
