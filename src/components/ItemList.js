import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import useProducts from '../hooks/useProducts';
import Card from './Card';
import CardSkeleton from './Skeletons/CardSkeleton';
import styles from './styles/ItemList.module.css';
import { ReactComponent as NavigateNextIcon } from '../images/navigate-next.svg';
import { ReactComponent as NavigateBeforeIcon } from '../images/navigate-before.svg';
import Filters from './Filters';
import FiltersSkeleton from './Skeletons/FiltersSkeleton';
import usePages from '../hooks/usePages';
import useFilters from '../hooks/useFilters';

export const itemsPerPage = 12;

export default function ItemList() {
  const { products, productsLoading } = useProducts();
  const { addToCart } = useContext(CartContext);

  const {
    filteredProducts,
    categoriesFilter,
    setCategoriesFilter,
    priceRangeIndex,
    setPriceRangeIndex,
  } = useFilters(products);

  const {
    paginatedProducts,
    numberOfPages,
    currentPageNumber,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
  } = usePages(filteredProducts, itemsPerPage);

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
          goToFirstPage,
        }}
      />
      <div className={styles.itemList}>
        <div className={styles.products}>
          {paginatedProducts.map((item) => (
            <Card key={item.id} item={item} addToCart={addToCart} />
          ))}
        </div>
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
      </div>
    </div>
  );
}
