import BaseRepository from './base.repository.js';
import { CartModel } from '../models/cart.model.js';

// 4.- Este repositorio maneja las operaciones CRUD relacionadas
//     con los usuarios y encapsula el acceso directo a la base de datos.

export default class CartRepostory extends BaseRepository {
  constructor() {
    super(CartModel);
  }
}
