import Skeleton from 'react-loading-skeleton';
import styles from '../styles/Filters.module.css';
import { priceRanges } from '../Filters';

export default function FiltersSkeleton() {
  return (
    <div className={styles.filtersContainer}>
      <h2>Filters</h2>
      <h3>Category</h3>
      <ul>
        {new Array(4).fill().map((_, i) => (
          <li key={i}>
            <button type="button">
              <Skeleton width={150} height={16} />
            </button>
          </li>
        ))}
      </ul>
      <h3>Price</h3>
      <ul>
        {priceRanges.map((range, i) => (
          <li key={i}>
            <button type="button">
              {range.min === null
                ? `Below $${range.max}`
                : range.max === null
                ? `Above $${range.min}`
                : `$${range.min} to $${range.max}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
