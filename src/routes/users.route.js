import { Router } from 'express';
import { login, register } from '../controllers/user.controller.js';
import { invokePassport } from '../middlewares/handleErrors.js';
import { handleAuth } from '../middlewares/handleAuth.js';
import UserController from '../controllers/user.controller.js';
import CustomRouter from './customRouter.js';
const userController = new UserController();

// TODO Ahora ya no usaré esto... centralizo todo en
// TODO una class que extiende mi clase comun

// const app = Router();

// app.post('/login', login);
// app.post('/register', register);

// // 1.- Primero verifica nuestro jwt si pasa es porque esta -> autenticado
// // 2.- Despues manejará la autorizacion
// app.get('/current', invokePassport('jwt'), handleAuth('admin'), (req, res) => {
//   res.send(req.user);
// });

// app.get('*', (req, res) => {
//   res.send('Error no se encontro la ruta');
// });

// export default app;

export default class UserRouterCustom extends CustomRouter {
  init() {
    this.post('/login', ['PUBLIC'], userController.login);
    this.post('/register', ['PUBLIC'], userController.register);
    this.get('/:id', ['ADMIN'], userController.getById);
    this.get('/', ['ADMIN'], userController.getAll);
    this.post('/', ['ADMIN'], userController.create);
    this.put('/:id', ['ADMIN'], userController.update);
  }
}
