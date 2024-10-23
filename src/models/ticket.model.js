import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  code: String,
  purchase_datetime: Date,
  amount: Number,
  purchaser: String,
});

export const TicketModel = model('ticket', ticketSchema);
