import Services from './services.js';
import CartRepostory from '../repositories/cart.repository.js';

const cartRepository = new CartRepostory();

export default class CartService extends Services {
  constructor() {
    super(cartRepository);
  }

  async addProductToCart(params) {
    const { id_user, id_product, quantity } = params;
    // Obtener el carrito del usuario (si no tiene, se crea uno)
    console.log({ id_user });

    let cart = await this.repository.findCartByUserId(id_user);

    if (!cart) {
      cart = await this.repository.create({ user: id_user, products: [] });
    }

    // Verificar si el producto ya está en el carrito
    const productIndex = cart.products.findIndex((p) => p.product.toString() === id_product);

    if (productIndex > -1) {
      // Si el producto ya existe en el carrito, aumentar la cantidad
      cart.products[productIndex].quantity += quantity;
    } else {
      // Si el producto no está en el carrito, agregarlo
      cart.products.push({ product: id_product, quantity });
    }

    console.log(cart);

    return await this.repository.updateCart(cart._id, { products: cart.products });
  }

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
