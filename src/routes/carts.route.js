import { Router } from 'express';
import { getCartById, createCart, updateCart } from '../controllers/carts.controller.js';

const app = Router();

app.get('/:cid', getCartById);
app.post('/', createCart);
app.put('/:cid/products/:pid', updateCart);

export default app;
