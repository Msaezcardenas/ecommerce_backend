import mongoose from 'mongoose';

export const connectionDB = async () => {
  console.log('ingresa a la coneccion BBDD');
  console.log(process.env.MONGO_STRING);
  try {
    await mongoose.connect(process.env.MONGO_STRING, { dbName: process.env.USE_DB });
    console.log(process.env.MONGO_STRING);
    console.log('BBDD conectada');
  } catch (e) {
    console.log('Error al conectarse a la bbdd');
  }
};
