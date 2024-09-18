import { Router } from 'express';

const app = Router();

app.get('/', (req, res) => {
  res.render('home', {});
});

app.get('/register', (req, res) => {
  res.render('register', {});
});

app.get('/login', (req, res) => {
  res.render('login', {});
});

export default app;
