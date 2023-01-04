import styles from "./styles/CartItem.module.css";
import DELETE_ICON from "../icons/delete.svg";
import { CartContext, CartItemType } from "../contexts/CartContext";
import { ChangeEvent, useContext } from "react";

export default function CartItem({ item }: { item: CartItemType }) {
  const { product, quantity } = item;

  const { updateQuantity, removeFromCart } = useContext(CartContext);

  function handleQuantityChange(e: ChangeEvent<HTMLInputElement>) {
    const newQuantity = Number(e.currentTarget.value);
    updateQuantity(item.product.id, newQuantity);
  }

  return (
    <div className={styles.cartItem}>
      <div className={styles.product}>
        <div className={styles.image}>
          <img
            className={styles.productImage}
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className={styles.description}>
          <h3>{product.title}</h3>
          <p className={styles.price}>
            Price per unit: ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
      <div className={styles.quantity}>
        <label>
          <span>Quantity:</span>
          <input
            type="number"
            min="1"
            max="100"
            onChange={handleQuantityChange}
            value={quantity}
          />
        </label>
        <button
          className={styles.removeFromCart}
          onClick={removeFromCart && (() => removeFromCart(item.product.id))}
        >
          <img src={DELETE_ICON} alt="Remove item from cart" />
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
