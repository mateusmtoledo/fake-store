import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import styles from './styles/Cart.module.css';
import emptyCartImage from '../images/empty-cart.svg';

function Cart({ cart, updateQuantity, removeFromCart }) {
  function calculateTotal() {
    return cart.reduce(
      (previous, current) =>
        previous + current.product.price * current.quantity,
      0,
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.items}>
        <h2>Cart</h2>
        {cart.length ? (
          cart.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))
        ) : (
          <div className={styles.emptyCart}>
            <img src={emptyCartImage} alt="Empty cart" />
            <div className={styles.emptyCartText}>
              <h3>Oops...</h3>
              <p>Your cart is empty.</p>
              <p>
                Click{' '}
                <strong>
                  <Link to="/shop">here</Link>
                </strong>{' '}
                to start shopping!
              </p>
            </div>
          </div>
        )}
      </div>
      <div className={styles.checkout}>
        <div className={styles.orderTotal}>
          <p>Order Total:</p>
          <p className={styles.totalPrice}>${calculateTotal().toFixed(2)}</p>
        </div>
        <button className={styles.goToCheckout}>Go to checkout</button>
        <Link to="/shop">
          <button className={styles.continueShopping}>Continue shopping</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
