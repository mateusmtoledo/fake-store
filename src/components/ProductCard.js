import UserRating from './UserRating';
import styles from './styles/ProductCard.module.css';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export default function ProductCard({ product }) {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const isInCart = cart.some((item) => item.product.id === product.id);

  return (
    <div className={styles.card}>
      <div className={styles.upper}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.productImage}
        />
        <h3>{product.title}</h3>
      </div>
      <div className={styles.lower}>
        <div className={styles.productInfo}>
          <UserRating
            rating={product.rating.rate}
            count={product.rating.count}
          />
          <p className={styles.price}>${product.price.toFixed(2)}</p>
        </div>
        {isInCart ? (
          <button
            type="button"
            onClick={() => removeFromCart(product.id)}
            className={styles.isInCart}
            aria-label="Remove from cart"
          />
        ) : (
          <button type="button" onClick={() => addToCart(product)}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
