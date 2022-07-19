import { Link } from "react-router-dom";
import shoppingImage from "../images/shopping.png";
import styles from "./styles/Home.module.css";

function Home() {
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroText}>
          <p>stuff that you</p>
          <p><strong>really</strong></p>
          <p>need.</p>
        </div>
        <img src={shoppingImage} alt="Shopping" />
      </div>
      <Link to="shop">
        <button>Shop now</button>
      </Link>
    </div>
  );
}

export default Home;
