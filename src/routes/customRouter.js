import { Router } from 'express';
import jwt from 'jsonwebtoken';

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  get(path, policies, ...cb) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.customResponses,
      this.applyCallbacks(cb),
    );
  }

  post(path, policies, ...cb) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.customResponses,
      this.applyCallbacks(cb),
    );
  }

  put(path, policies, ...cb) {
    this.router.put(
      path,
      this.handlePolicies(policies),
      this.customResponses,
      this.applyCallbacks(cb),
    );
  }
  delete(path, policies, ...cb) {
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.customResponses,
      this.applyCallbacks(cb),
    );
  }

  applyCallbacks(cb) {
    return cb.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params); // ejecuta el callback y le pasa como parametro el array
      } catch (e) {
        return params[1].status(500).send(e); // params[1] -> res
      }
    });
  }

  customResponses(req, res, next) {
    res.success = (payload) => res.json({ status: 'success', payload });
    res.errorServer = (error) => res.status(500).json({ status: 'server error', error });
    res.notFound = () =>
      res.status(404).json({ status: 'not found', error: 'Recurso no encontrado' });
    next();
  }

  handlePolicies(policies) {
    // ['PUBLIC','ADMIN','USER','SUPERADMIN']
    return (req, res, next) => {
      if (policies.includes('PUBLIC')) return next();
      const reqJWT = req.headers.authorization; // si me da un jwt es porque se logueo o almenos estuvo loqueado
      if (!reqJWT) return res.status(400).send({ status: 'error', message: 'no logueado' });
      let userPayload = null;
      const token = reqJWT.split(' ')[1];

      try {
        userPayload = jwt.verify(token, process.env.SECRET);
        console.log({ userPayload });
      } catch (e) {
        return res.status(400).send({ status: 'error', message: e });
      }
      if (!userPayload)
        return res.status(400).send({ status: 'error', message: 'error en el token' });
      if (!policies.includes(userPayload.role.toUpperCase()))
        return res.status(403).send({ status: 'error', message: 'no estas autorizado' });
      req.user = userPayload;
      next();
    };
  }
}
