// Crear un modelo Ticket el cual contará con
// todas las formalizaciones de la compra.
// Éste contará con los campos
// - Id (autogenerado por mongo)
// - code: String debe autogenerarse y ser
// único
// - purchase_datetime: Deberá guardar la
// fecha y hora exacta en la cual se
// formalizó la compra (básicamente es un
// created_at)
// - amount: Number, total de la compra.
// - purchaser: String, contendrá el correo
// del usuario asociado al carrito

import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  code: String,
  purchase_datetime: Date,
  amount: Number,
  purchaser: String, // correo del usuario asociado al carrito
});

export const ProductModel = model('ticket', ticketSchema);
