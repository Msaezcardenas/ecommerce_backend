import Services from './services.js';
import CartRepostory from '../repositories/cart.repository.js';

const cartRepository = new CartRepostory();

export default class CartService extends Services {
  constructor() {
    super(cartRepository);
  }

  // Método para obtener el carrito con productos poblados
  // async getCartWithProducts(cartId) {
  //   try {
  //     return await this.repository.getPopulatedCartById(cartId);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  async updateCart(req, res) {
    console.log('------//', req);
    const { cid, pid } = req;

    const cartFinded = await this.repository.getById(cid);
    if (!cartFinded) res.status(404).json({ message: 'error' });

    console.log({ cartFinded });

    const indexProd = cartFinded.products.findIndex((prod) => prod._id.toString() === pid);
    console.log(indexProd);

    // Si el  producto no  existe se agrega
    if (indexProd === -1) {
      cartFinded.products.push({ product: pid, quantity: 1 });
    } else {
      // si existe se aumenta la  cantidad
      cartFinded.products[indexProd] = {
        product: cartFinded.products[indexProd].product,
        quantity: cartFinded.products[indexProd].quantity + 1,
      };
    }

    //   const cartUpdated = await CartModel.findByIdAndUpdate(cid, cartFinded, {
    //     new: true,
    //   }).populate('products.product');

    const cartUpdated = await this.repository.getPopulatedCartById(cid, cartFinded);

    console.log('Final----->s', cartUpdated);

    return cartUpdated;
    // res.status(201).json({ message: 'Product Added', cart: cartUpdated });
  }
}
