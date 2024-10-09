import { generadorToken, isValidPassword, createHash } from '../utils.js';
import UserAccessMongo from '../models/user.dao.js';
import Services from './services.js';
import userSchema from '../validators/userValidator.js';

const userDAO = new UserAccessMongo();

export default class UserService extends Services {
  constructor() {
    super(userDAO);
  }

  async register(user) {
    try {
      const { email, password, first_name, last_name, age, role } = user;
      const { error } = userSchema.validate(user);
      if (error) throw new Error(error);
      const existUser = await this.dao.getByEmail(email); // utiliza una funcion que se conecta a la base de datos
      if (existUser) throw new Error('usuario ya existe');
      if (!existUser) {
        const newUser = await this.dao.create({
          ...user,
          password: createHash(password),
        });
        return newUser;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.dao.getByEmail(email);
      if (!userExist) return null;
      const passValid = isValidPassword(userExist, password);
      if (!passValid) throw new Error('constraseña incorrecta');
      if (userExist && passValid) return generadorToken(userExist.toObject());
    } catch (error) {
      throw new Error(error);
    }
  }
}
