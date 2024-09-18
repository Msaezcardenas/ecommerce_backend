import { Router } from 'express';
import { login, register } from '../controllers/user.controller.js';
import { invokePassport } from '../middlewares/handleErrors.js';
import { handleAuth } from '../middlewares/handleAuth.js';

const app = Router();

app.post('/login', login);
app.post('/register', register);

// 1.- Primero verifica nuestro jwt si pasa es porque esta -> autenticado
// 2.- Despues manejará la autorizacion
app.get('/current', invokePassport('jwt'), handleAuth('admin'), (req, res) => {
  res.send(req.user);
});

export default app;
