import Skeleton from 'react-loading-skeleton';
import styles from '../styles/Filters.module.css';

export default function FiltersSkeleton() {
  return (
    <Skeleton width={220} height={500} className={styles.filtersContainer} />
  );
}
