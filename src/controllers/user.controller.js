import UserService from '../services/user.services.js';
import { createResponse } from '../utils.js';
import BaseController from './baseController.js';

const userService = new UserService();

//  2.- El controlador maneja las solicitudes HTTP relacionadas con la
//      creación de usuarios y delega la lógica de negocio al servicio

export default class UserController extends BaseController {
  constructor() {
    super(userService);
  }

  register = async (req, res, next) => {
    try {
      const data = await this.service.register(req.body);
      !data ? createResponse(res, 404, data) : createResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    console.log('ingresa a login controller');

    try {
      const token = await this.service.login(req.body);
      !token ? createResponse(res, 404, token) : createResponse(res, 200, token);
    } catch (error) {
      next(error);
    }
  };
}
