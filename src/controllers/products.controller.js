import { ProductModel } from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const result = await ProductModel.find();
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener productos');
  }
};
