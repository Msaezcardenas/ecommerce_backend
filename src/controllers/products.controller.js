import { ProductModel } from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().lean();
    res.render('products', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener productos');
  }
};
