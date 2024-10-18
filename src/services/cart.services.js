import Services from './services.js';
import CartRepostory from '../repositories/cart.repository.js';

const cartRepository = new CartRepostory();

export default class CartService extends Services {
  constructor() {
    super(cartRepository);
  }

  async updateCart(req, res) {
    console.log('------//', req);
    const { cid, pid } = req;

    const cartFinded = await this.repository.getById(cid);
    if (!cartFinded) res.status(404).json({ message: 'error' });

    console.log({ cartFinded });

    const indexProd = cartFinded.products.findIndex((prod) => prod._id.toString() === pid);
    console.log(indexProd);

    if (indexProd === -1) {
      cartFinded.products.push({ product: pid, quantity: 1 });
    } else {
      cartFinded.products[indexProd] = {
        product: cartFinded.products[indexProd].product,
        quantity: cartFinded.products[indexProd].quantity + 1,
      };
    }
    const cartUpdated = await this.repository.update(cid, cartFinded, {
      new: true,
    });

    console.log(cartUpdated);

    // res.status(201).json({ message: 'Product Added', cart: cartUpdated });
  }
}
