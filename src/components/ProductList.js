import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import ProductCard from './ProductCard';
import styles from './styles/ProductList.module.css';
import VOID_IMG from '../images/void.svg';

export default function ProductList({ products }) {
  const { addToCart } = useContext(CartContext);

  if (!products.length) {
    return (
      <div className={styles.noResults}>
        <img src={VOID_IMG} alt="No results found" />
        <p>No results found</p>
      </div>
    );
  }

  return (
    <div className={styles.products}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}
