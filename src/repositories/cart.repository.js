import BaseRepository from './base.repository.js';
import { CartModel } from '../models/cart.model.js';

// 4.- Este repositorio maneja las operaciones CRUD relacionadas
//     con los usuarios y encapsula el acceso directo a la base de datos.

export default class CartRepostory extends BaseRepository {
  constructor() {
    super(CartModel);
  }

  async findCartByUserId(id) {
    try {
      return await this.model.findOne({ user: id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCart(cartId, update) {
    try {
      return this.model.findByIdAndUpdate(cartId, update, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPopulatedCartById(id, cartFinded) {
    try {
      return await this.model
        .findByIdAndUpdate(id, cartFinded, { new: true })
        .populate('products.product'); // Aquí se hace el populate
    } catch (error) {
      throw new Error(error);
    }
  }
}
