import useProducts from '../hooks/useProducts';
import styles from './styles/ProductListPage.module.css';
import Filters from './Filters';
import FiltersSkeleton from './Skeletons/FiltersSkeleton';
import usePages from '../hooks/usePages';
import useFilters from '../hooks/useFilters';
import ProductList from './ProductList';
import PageNavigation from './PageNavigation';
import ProductListSkeleton from './Skeletons/ProductListSkeleton';
import { useEffect, useState } from 'react';
import useSorting from '../hooks/useSorting';
import Skeleton from 'react-loading-skeleton';
import SortingSelect from './SortingSelect';

export const productsPerPage = 12;

// export function addCategoryToSet(prev, category) {
//   return new Set([...prev, category]);
// }

// export function deleteCategoryFromSet(prev, category) {
//   return new Set(prev).add(category);
// }

export default function ProductListPage() {
  const { products, productsLoading } = useProducts();

  const [priceRangeIndex, setPriceRangeIndex] = useState(null);
  const {
    filteredProducts,
    categoriesFilters,
    addCategoryFilter,
    deleteCategoryFilter,
  } = useFilters(products, priceRangeIndex);

  const [sortBy, setSortBy] = useState('date-');
  const { sortedProducts } = useSorting(filteredProducts, sortBy);

  const {
    paginatedProducts,
    numberOfPages,
    currentPageNumber,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    firstProductNumber,
    lastProductNumber,
  } = usePages(sortedProducts, productsPerPage);

  useEffect(() => {
    goToFirstPage();
  }, [goToFirstPage, categoriesFilters, priceRangeIndex]);

  if (productsLoading) {
    return (
      <div className={styles.productListPage}>
        <div className={styles.upperBar}>
          <Skeleton width={96} height={23} />
          <p>
            <Skeleton width={133} height={19} />
          </p>
        </div>
        <div className={styles.container}>
          <FiltersSkeleton />
          <div className={styles.productListContainer}>
            <ProductListSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productListPage}>
      <div className={styles.upperBar}>
        <SortingSelect sortBy={sortBy} setSortBy={setSortBy} />
        <p>{`Showing ${firstProductNumber}-${lastProductNumber} of ${filteredProducts.length}`}</p>
      </div>
      <div className={styles.container}>
        <Filters
          products={products}
          categoriesFilters={categoriesFilters}
          addCategoryFilter={addCategoryFilter}
          deleteCategoryFilter={deleteCategoryFilter}
          priceRangeIndex={priceRangeIndex}
          setPriceRangeIndex={setPriceRangeIndex}
        />
        <div className={styles.productListContainer}>
          <ProductList products={paginatedProducts} />
          <PageNavigation
            currentPageNumber={currentPageNumber}
            numberOfPages={numberOfPages}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
          />
        </div>
      </div>
    </div>
  );
}
