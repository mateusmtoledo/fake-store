import styles from "./styles/Header.module.css";
import { Link } from "react-router-dom";
import cartIcon from "../icons/cart.svg";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

function Header() {
  const { cart } = useContext(CartContext);

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1>fake store</h1>
      </Link>
      <nav>
        <Link to="/shop">
          <p>Shop</p>
        </Link>
        <Link className={styles.goToCart} to="/cart">
          <img src={cartIcon} alt="Go to cart" />
          <p
            title="Number of items in the cart"
            className={styles.numberOfCartItems}
          >
            {cart.length}
          </p>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
