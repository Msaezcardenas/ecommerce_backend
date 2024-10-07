import { UserModel } from '../models/user.model.js';
import { createHash, generadorToken, isValidPassword } from '../utils.js';

// TODO
// 1.- LOGIN -> Cliente ingresa con password and email
// 2.- Buscamos en bbdd si existe
// 3.- Si existe traemos al usuario, extraemos su password desde bbdd
// y la comparamos con la password que ingreso
// 4.- si es valida -> pasa el registo y generamos un token
// 5.- el token lo guardamos en una cookie para que el cliente la guarde en el navegador

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const userFound = await UserModel.findOne({ email }).lean();
    if (isValidPassword(userFound, password)) {
      const token = generadorToken({
        email: userFound.email,
        nombre: userFound.first_name,
        role: userFound.role,
      });
      console.log(token);

      return res
        .status(200)
        .cookie('currentUser', token, { maxAge: 60000, signed: true, httpOnly: true })
        .json({ message: 'login', token });
    }
    return res.status(200).json({ message: 'error login' });
  } catch (error) {
    return res.json({ message: error });
  }
};

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;
    const userfound = await UserModel.findOne({ email });
    if (userfound) {
      return res.status(400).json({ message: 'ya existe el usuario' });
    }

    const newUser = {
      first_name,
      last_name,
      email,
      age,
      role,
      password: createHash(password),
    };

    const user = await UserModel.create(newUser);
    return res.status(201).json({ message: 'usuario creado', user });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
