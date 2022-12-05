import styles from '../styles/ProductList.module.css';
import ProductCardSkeleton from './ProductCardSkeleton';

export default function ProductListSkeleton() {
  return (
    <div className={styles.products}>
      {new Array(12).fill().map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
