import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import ProductCard from './ProductCard';
import styles from './styles/ProductList.module.css';

export default function ProductList({ products }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className={styles.products}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}
