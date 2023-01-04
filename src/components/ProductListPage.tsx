import useProducts from "../hooks/useProducts";
import styles from "./styles/ProductListPage.module.css";
import Filters, { MobileFiltersButton, MobileFiltersMenu } from "./Filters";
import FiltersSkeleton from "./Skeletons/FiltersSkeleton";
import usePages from "../hooks/usePages";
import useFilters from "../hooks/useFilters";
import ProductList from "./ProductList";
import PageNavigation from "./PageNavigation";
import ProductListSkeleton from "./Skeletons/ProductListSkeleton";
import { useEffect, useState } from "react";
import useSorting from "../hooks/useSorting";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Sorting from "./Sorting";

export const productsPerPage = 12;

export default function ProductListPage() {
  const { products, productsLoading } = useProducts();

  const [priceRangeIndex, setPriceRangeIndex] = useState<number | null>(null);
  const {
    filteredProducts,
    categoriesFilters,
    addCategoryFilter,
    deleteCategoryFilter,
  } = useFilters(products, priceRangeIndex);

  const [sortBy, setSortBy] = useState("date-");
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

  const [mobileFilters, setMobileFilters] = useState(false);
  useEffect(() => {
    function resizeHandler() {
      if (window.innerWidth <= 800 && !mobileFilters) {
        setMobileFilters(true);
      } else if (window.innerWidth > 800 && mobileFilters) {
        setMobileFilters(false);
      }
    }
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [mobileFilters]);

  useEffect(() => {
    goToFirstPage();
  }, [goToFirstPage, categoriesFilters, priceRangeIndex]);

  const [filtersModalVisible, setFiltersModalVisible] = useState(false);

  if (productsLoading) {
    return (
      <SkeletonTheme borderRadius={0}>
        <div className={styles.productListPage}>
          <div className={styles.upperBar}>
            <Skeleton width={96} height={23} />
            <p>
              <Skeleton width={133} height={19} />
            </p>
          </div>
          <div className={styles.container}>
            {!mobileFilters && <FiltersSkeleton />}
            <div className={styles.productListContainer}>
              <ProductListSkeleton />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div className={styles.productListPage}>
      {filtersModalVisible && (
        <MobileFiltersMenu
          products={products}
          categoriesFilters={categoriesFilters}
          addCategoryFilter={addCategoryFilter}
          deleteCategoryFilter={deleteCategoryFilter}
          priceRangeIndex={priceRangeIndex}
          setPriceRangeIndex={setPriceRangeIndex}
          setModalVisible={setFiltersModalVisible}
        />
      )}
      <div className={styles.upperBar}>
        <div className={styles.sortAndFilterContainer}>
          <Sorting sortBy={sortBy} setSortBy={setSortBy} />
          {mobileFilters && (
            <MobileFiltersButton setModalVisible={setFiltersModalVisible} />
          )}
        </div>
        <p>{`Showing ${firstProductNumber}-${lastProductNumber} of ${filteredProducts.length}`}</p>
      </div>
      <div className={styles.container}>
        {!mobileFilters && (
          <Filters
            products={products}
            categoriesFilters={categoriesFilters}
            addCategoryFilter={addCategoryFilter}
            deleteCategoryFilter={deleteCategoryFilter}
            priceRangeIndex={priceRangeIndex}
            setPriceRangeIndex={setPriceRangeIndex}
          />
        )}
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
