import useProducts from '../hooks/useProducts';
import styles from './styles/ItemList.module.css';
import Filters from './Filters';
import FiltersSkeleton from './Skeletons/FiltersSkeleton';
import usePages from '../hooks/usePages';
import useFilters from '../hooks/useFilters';
import ProductList from './ProductList';
import PageNavigation from './PageNavigation';
import ProductListSkeleton from './Skeletons/ProductListSkeleton';

export const productsPerPage = 12;

export default function ProductListPage() {
  const { products, productsLoading } = useProducts();

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
  } = usePages(filteredProducts, productsPerPage);

  if (productsLoading) {
    return (
      <div className={styles.productListPage}>
        <FiltersSkeleton />
        <div className={styles.productListContainer}>
          <ProductListSkeleton />
        </div>
      </div>
    );
  }

  // TODO number of results indicator
  // TODO no results message
  // FIXME page number indicator placement
  return (
    <div className={styles.productListPage}>
      <Filters
        products={products}
        categoriesFilter={categoriesFilter}
        setCategoriesFilter={setCategoriesFilter}
        priceRangeIndex={priceRangeIndex}
        setPriceRangeIndex={setPriceRangeIndex}
        goToFirstPage={goToFirstPage}
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
  );
}
