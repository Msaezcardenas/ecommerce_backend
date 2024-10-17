import BaseRepository from './base.repository.js';
import { UserModel } from '../models/user.model.js';

// 4.- Este repositorio maneja las operaciones CRUD relacionadas
//     con los usuarios y encapsula el acceso directo a la base de datos.

export default class UserRepository extends BaseRepository {
  constructor() {
    super(UserModel);
  }

  async getByEmail(email) {
    try {
      return await this.model.findOne({ email }); // modelo es la conexion a la base de datos
    } catch (error) {
      throw new Error(error);
    }
  }
}
