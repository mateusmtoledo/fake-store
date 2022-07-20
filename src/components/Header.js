import styles from "./styles/Header.module.css";
import { Link } from 'react-router-dom';
import cartIcon from '../icons/cart.svg';

function Header({numberOfCartItems}) {
  return(
    <header className={styles.header}>
      <h1>fake store</h1>
      <nav>
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/shop">
          <p>Shop</p>
        </Link>
        <Link className={styles.goToCart} to="/cart">
          <img src={cartIcon} alt="Go to cart" />
          <p title="Number of items in the cart" className={styles.numberOfCartItems}>{numberOfCartItems}</p>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
