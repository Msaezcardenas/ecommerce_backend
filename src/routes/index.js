import { Router } from 'express';
import { ROUTE_PATH } from '../constants/routesPath.js';
import ViewsRouter from './views.route.js';
import UserRouter from './users.route.js';
import CartsRouter from './carts.route.js';
import ProductsRouter from './products.route.js';

const app = Router();

app.use(ROUTE_PATH.view, ViewsRouter);
app.use(ROUTE_PATH.api_users, UserRouter);
app.use(ROUTE_PATH.api_carts, CartsRouter);
app.use(ROUTE_PATH.api_products, ProductsRouter);

export default app;
