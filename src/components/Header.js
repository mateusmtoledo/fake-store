import styles from "./styles/Header.module.css";
import { Link } from 'react-router-dom';
import cartIcon from '../icons/cart.svg';

function Header() {
  return(
    <header className={styles.header}>
      <h1>my store</h1>
      <nav>
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/shop">
          <p>Shop</p>
        </Link>
        <Link to="/cart">
          <img src={cartIcon} alt="Go to cart" />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
