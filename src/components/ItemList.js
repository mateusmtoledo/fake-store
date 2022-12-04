import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import useProducts from '../hooks/useProducts';
import Card from './Card';
import CardSkeleton from './Skeletons/CardSkeleton';
import styles from './styles/ItemList.module.css';
import { ReactComponent as NavigateNextIcon } from '../images/navigate-next.svg';
import { ReactComponent as NavigateBeforeIcon } from '../images/navigate-before.svg';
import Filters, { priceRanges } from './Filters';
import { filterByCategories, filterByPriceRange } from '../utils/filterUtils';
import FiltersSkeleton from './Skeletons/FiltersSkeleton';

export const itemsPerPage = 12;

export default function ItemList() {
  const { products, productsLoading } = useProducts();
  const { addToCart } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1);

  const [categoriesFilter, setCategoriesFilter] = useState(null);
  const [priceRangeIndex, setPriceRangeIndex] = useState(null);
  const priceRange =
    priceRangeIndex === null ? null : priceRanges[priceRangeIndex];

  const filteredProducts = filterByPriceRange(
    filterByCategories(products, categoriesFilter),
    priceRange,
  );

  const numberOfPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
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
      <div className={styles.itemListContainer}>
        <FiltersSkeleton />
        <div className={styles.itemList}>
          <div className={styles.products}>
            {new Array(12).fill().map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // TODO number of results indicator
  // TODO no results message
  // FIXME page number indicator placement
  return (
    <div className={styles.itemListContainer}>
      <Filters
        {...{
          products,
          categoriesFilter,
          setCategoriesFilter,
          priceRangeIndex,
          setPriceRangeIndex,
          setCurrentPage,
        }}
      />
      <div className={styles.itemList}>
        <div className={styles.products}>
          {filteredProducts.slice(startIndex, endIndex).map((item) => (
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
    </div>
  );
}
