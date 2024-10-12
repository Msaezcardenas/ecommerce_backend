import { Router } from 'express';
import { ROUTE_PATH } from '../constants/routesPath.js';
import ViewsRouter from './views.route.js';
import CartsRouter from './carts.route.js';
import ProductsRouter from './product.route.js';
import UserRouterCustom from './users.route.js';
import ProductRouterCustom from './product.route.js';

const app = Router();
const UserRouter = new UserRouterCustom();
const ProductRouter = new ProductRouterCustom();

app.use(ROUTE_PATH.view, ViewsRouter);
app.use(ROUTE_PATH.api_carts, CartsRouter);

// Ahora en vez de usar
//  esto : app.use(ROUTE_PATH.api_users, UserRouter);

app.use(ROUTE_PATH.api_users, UserRouter.getRouter());
app.use(ROUTE_PATH.api_products, ProductRouter.getRouter());

export default app;
