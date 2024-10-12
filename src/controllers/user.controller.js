import UserService from '../services/user.services.js';
import { createResponse } from '../utils.js';
import Controllers from './Controllers.js';

const userService = new UserService();

export default class UserController extends Controllers {
  constructor() {
    super(userService); // constructor(userService) del padre
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
    try {
      const token = await this.service.login(req.body);
      !token ? createResponse(res, 404, token) : createResponse(res, 200, token);
    } catch (error) {
      next(error);
    }
  };
}
