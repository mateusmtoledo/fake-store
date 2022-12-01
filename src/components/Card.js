import UserRating from './UserRating';
import styles from './styles/Card.module.css';

function Card({ item, addToCart }) {
  return (
    <div className={styles.card}>
      <div className={styles.upper}>
        <img
          src={item.image}
          alt={item.title}
          className={styles.productImage}
        />
        <h3>{item.title}</h3>
      </div>
      <div className={styles.lower}>
        <div className={styles.itemInfo}>
          <UserRating rating={item.rating.rate} count={item.rating.count} />
          <p className={styles.price}>${item.price.toFixed(2)}</p>
        </div>
        <button type="button" onClick={() => addToCart(item)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Card;
