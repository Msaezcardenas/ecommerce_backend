import BaseRepository from './base.repository.js';
import { CartModel } from '../models/cart.model.js';

// 4.- Este repositorio maneja las operaciones CRUD relacionadas
//     con los usuarios y encapsula el acceso directo a la base de datos.

export default class CartRepostory extends BaseRepository {
  constructor() {
    super(CartModel);
  }

  // async getById(id) {
  //   try {
  //     return await this.model.findById(id);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  //   const cartUpdated = await CartModel.findByIdAndUpdate(cid, cartFinded, {
  //     new: true,
  //   }).populate('products.product');

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
