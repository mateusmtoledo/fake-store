import styles from "./styles/CartItem.module.css";
import removeIcon from "../icons/remove.svg";

function CartItem({ item, updateQuantity, removeFromCart }) {
  const { product, quantity } = item;

  return (
    <div className={styles.cartItem}>
      <div className={styles.productDescription}>
        <div className={styles.image}><img className={styles.productImage} src={product.image} alt={product.title}></img></div>
        <div>
          <h3>{product.title}</h3>
          <p className={styles.price}>Price per unit: ${product.price.toFixed(2)}</p>
        </div>
      </div>
      <div className={styles.quantity}>
        <label>
          <span>Quantity:</span>
          <input type="number" min="1" max="100" onChange={updateQuantity} value={quantity} />
        </label>
        <button className={styles.removeFromCart} onClick={removeFromCart}>
          <img src={removeIcon} alt="Remove item from cart" />
          <p>Remove</p>
        </button>
      </div>
      <div className={styles.cost}>
        <p>Total:</p>
        <p title="Total item cost">${(product.price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default CartItem;
