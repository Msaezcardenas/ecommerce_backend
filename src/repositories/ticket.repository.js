import BaseRepository from './base.repository.js';
import { TicketModel } from '../models/ticket.model.js';

// 4.- Este repositorio maneja las operaciones CRUD relacionadas
//     con los usuarios y encapsula el acceso directo a la base de datos.

export default class TicketRepository extends BaseRepository {
  constructor() {
    super(TicketModel);
  }
}
