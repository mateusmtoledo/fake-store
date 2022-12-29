import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import styles from '../styles/ProductCard.module.css';

export default function ProductCardSkeleton() {
  return (
    <div data-testid="card-skeleton">
      <Skeleton width="100%" height="300px" className={styles.card} />
    </div>
  );
}
