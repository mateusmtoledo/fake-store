import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import useProducts from '../hooks/useProducts';
import Card from './Card';
import CardSkeleton from './CardSkeleton';
import styles from './styles/ItemList.module.css';
import { ReactComponent as NavigateNextIcon } from '../images/navigate-next.svg';
import { ReactComponent as NavigateBeforeIcon } from '../images/navigate-before.svg';

export const itemsPerPage = 12;

export default function ItemList() {
  const { products, productsLoading } = useProducts();
  const { addToCart } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = itemsPerPage * (currentPage - 1);
  const endIndex = itemsPerPage * currentPage;

  function nextPage() {
    const newPage = Math.min(numberOfPages, currentPage + 1);
    setCurrentPage(newPage);
  }

  function previousPage() {
    const newPage = Math.max(1, currentPage - 1);
    setCurrentPage(newPage);
  }

  if (productsLoading) {
    return (
      <div className={styles.itemList}>
        <div className={styles.products}>
          {new Array(9).fill().map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.itemList}>
      <div className={styles.products}>
        {products.slice(startIndex, endIndex).map((item) => (
          <Card key={item.id} item={item} addToCart={addToCart} />
        ))}
      </div>
      <div className={styles.navigation}>
        {currentPage > 1 && (
          <button
            title="Navigate to previous page"
            type="button"
            onClick={previousPage}
          >
            <NavigateBeforeIcon className={styles.navigationIcon} />
          </button>
        )}
        <p>
          Page {currentPage} of {numberOfPages}
        </p>
        {currentPage < numberOfPages && (
          <button
            title="Navigate to next page"
            type="button"
            onClick={nextPage}
          >
            <NavigateNextIcon className={styles.navigationIcon} />
          </button>
        )}
      </div>
    </div>
  );
}
