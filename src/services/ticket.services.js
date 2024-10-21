import Services from './services.js';
import TicketRepository from '../repositories/ticket.repository.js';
import { generateUniqueCode } from '../utils.js';

const ticketRepository = new TicketRepository();

export default class TicketService extends Services {
  constructor() {
    super(ticketRepository);
  }

  async createTicket(purchaseData) {
    try {
      const { amount, purchaser } = purchaseData;

      // Generar el código único para el ticket
      const code = generateUniqueCode();
      console.log({ code });

      // Crear el ticket con los datos proporcionados
      const ticket = {
        code,
        purchase_datetime: new Date(),
        amount,
        purchaser,
      };

      console.log(ticket);

      await this.repository.create(ticket);
      return ticket;
    } catch (error) {
      throw new Error('Error al crear el ticket: ' + error.message);
    }
  }
}
