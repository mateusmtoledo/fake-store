import styles from './styles/PageNavigation.module.css';
import { ReactComponent as NavigateNextIcon } from '../images/navigate-next.svg';
import { ReactComponent as NavigateBeforeIcon } from '../images/navigate-before.svg';

export default function PageNavigation({
  currentPageNumber,
  numberOfPages,
  goToPreviousPage,
  goToNextPage,
}) {
  return (
    <div className={styles.navigation}>
      {currentPageNumber > 1 && (
        <button
          title="Navigate to previous page"
          type="button"
          onClick={goToPreviousPage}
        >
          <NavigateBeforeIcon className={styles.navigationIcon} />
        </button>
      )}
      <p>
        Page {currentPageNumber} of {numberOfPages}
      </p>
      {currentPageNumber < numberOfPages && (
        <button
          title="Navigate to next page"
          type="button"
          onClick={goToNextPage}
        >
          <NavigateNextIcon className={styles.navigationIcon} />
        </button>
      )}
    </div>
  );
}
