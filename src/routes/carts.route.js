import { Router } from 'express';
import { getCartById, createCart } from '../controllers/carts.controller.js';

const app = Router();

app.get('/:cid', getCartById);
app.post('/', createCart);

export default app;
