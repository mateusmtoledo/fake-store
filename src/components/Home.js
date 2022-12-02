import { Link } from 'react-router-dom';
import shoppingImage from '../images/shopping.svg';
import styles from './styles/Home.module.css';
import productVarietyImage from '../images/product-variety.svg';
import paymentMethodsImage from '../images/payment-methods.svg';

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroText}>
            <p>stuff you</p>
            <p>
              <strong>really</strong>
            </p>
            <p>need.</p>
          </div>
          <img src={shoppingImage} alt="Shopping" />
        </div>
        <Link to="shop">
          <button>Shop now</button>
        </Link>
      </div>
      <div className={styles.messages}>
        <div className={`${styles.message}`}>
          <img src={productVarietyImage} alt="Product variety" />
          <div>
            <h2>Thousands of items for you to pick</h2>
            <p>
              Actually, we've only got 20, but there might be more in the
              future.
            </p>
          </div>
        </div>
        <div className={`${styles.message}`}>
          <div>
            <h2>Lots of payment methods</h2>
            <p>
              But thankfully this isn't a real store, so you don't really have
              to pay.
            </p>
          </div>
          <img src={paymentMethodsImage} alt="Payment methods" />
        </div>
      </div>
    </div>
  );
}

export default Home;
