import UserRating from './UserRating';
import styles from './styles/ProductCard.module.css';

export default function ProductCard({ product, addToCart }) {
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
        <button type="button" onClick={() => addToCart(product)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
