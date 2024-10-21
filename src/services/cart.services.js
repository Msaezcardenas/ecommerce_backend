import Services from './services.js';
import CartRepostory from '../repositories/cart.repository.js';
import ProductRepository from '../repositories/product.repository.js';
import TicketRepository from '../repositories/ticket.repository.js';
import TicketService from './ticket.services.js';

const productRepository = new ProductRepository();
const ticketRepository = new TicketRepository();
const ticketService = new TicketService();
const cartRepository = new CartRepostory();

export default class CartService extends Services {
  constructor() {
    super(cartRepository);
  }

  async addProductToCart(params) {
    const { id_user, id_product, quantity } = params;
    // Obtener el carrito del usuario (si no tiene, se crea uno)
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
    return await this.repository.updateCart(cart._id, { products: cart.products });
  }

  async updateCart(req, res) {
    const { cid, pid } = req;
    const cartFinded = await this.repository.getById(cid);
    if (!cartFinded) res.status(404).json({ message: 'error' });
    const indexProd = cartFinded.products.findIndex((prod) => prod._id.toString() === pid);
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
    const cartUpdated = await this.repository.getPopulatedCartById(cid, cartFinded);
    return cartUpdated;
  }
  async purchase(cid) {
    try {
      console.log('purchase');
      const cart = await this.repository.getPopulatedCartById(cid);
      console.log(cart);

      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      const productsToPurchase = [];
      const unavailableProducts = [];

      // 2. Recorrer productos del carrito y verificar el stock
      for (const item of cart.products) {
        console.log('ingresa a for');

        const product = item.product; // Producto desde la base de datos
        const quantity = item.quantity; // Cantidad en el carrito

        console.log(product.stock);
        if (product.stock >= quantity) {
          // 3. Si hay stock suficiente, agregar a la lista de productos comprados
          productsToPurchase.push({
            product: product._id,
            quantity,
            price: product.price,
          });
          // Restar la cantidad del stock
          product.stock + quantity;

          const updatedProduct = { ...item.product, stock: product.stock + quantity };
          await productRepository.update(item.product.id, updatedProduct);

          // await productRepository.update(item.product); // Guardar el producto con el stock actualizado
        } else {
          // 4. Si no hay suficiente stock, agregar a la lista de productos no disponibles
          unavailableProducts.push(product._id);
        }
      }

      // Generar ticket si hay productos comprados
      if (productsToPurchase.length > 0) {
        console.log(productsToPurchase);

        const totalAmount = productsToPurchase.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
        console.log(totalAmount);

        // Llamar al servicio de tickets para crear el ticket
        const ticket = await ticketService.createTicket({
          amount: totalAmount,
          purchaser: cart.user.email, // Asociar el email del usuario al ticket
        });
        console.log({ ticket });

        // Filtrar los productos que no pudieron comprarse del carrito
        cart.products = unavailableProducts.map((productId) =>
          cart.products.find((item) => item.product._id.equals(productId)),
        );
        console.log(cart);

        return { ticket, unavailableProducts };
      }
    } catch (error) {}
  }
}
