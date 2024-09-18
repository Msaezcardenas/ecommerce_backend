import { Router } from 'express';
import { getCartById } from '../controllers/carts.controller.js';

const app = Router();

app.get('/:cid', getCartById);

export default app;
