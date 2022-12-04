import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import styles from '../styles/Card.module.css';

export default function CardSkeleton() {
  return (
    <div className={styles.card} data-testid="card-skeleton">
      <div className={styles.upper}>
        <Skeleton height={96} width={96} borderRadius={0} />
        <h3>
          <Skeleton count={2} width={150} />
        </h3>
      </div>
      <div className={styles.lower}>
        <div className={styles.itemInfo}>
          <div>
            <div>
              <Skeleton width={80} height={19} />
            </div>
            <p>
              <Skeleton width={60} height={16} />
            </p>
          </div>
          <p className={styles.price}>
            <Skeleton width={77} height={25} />
          </p>
        </div>
        <Skeleton
          height={31}
          borderRadius={0}
          highlightColor="#ffffff22"
          baseColor="#393E46"
        />
      </div>
    </div>
  );
}
