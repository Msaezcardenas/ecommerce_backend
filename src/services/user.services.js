import { generadorToken, isValidPassword } from '../utils.js';
import UserAccessMongo from '../models/user.dao.js';
import Services from './services.js';

const userDAO = new UserAccessMongo();

export default class UserService extends Services {
  constructor() {
    super(userDAO);
  }

  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.dao.getByEmail(email); // utiliza una funcion que se conecta a la base de datos
      if (!existUser) {
        const newUser = await this.dao.create({
          ...user,
          password: createHash(password),
        });
        return newUser;
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.dao.getByEmail(email);
      if (!userExist) return null;
      const passValid = isValidPassword(password, userExist);
      if (!passValid) return null;
      if (userExist && passValid) return generadorToken(userExist);
    } catch (error) {
      throw new Error(error);
    }
  }
}
