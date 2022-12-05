import { priceRanges } from '../components/Filters';
import { filterByCategories, filterByPriceRange } from '../utils/filterUtils';

class FilterChain {
  constructor(products) {
    this.products = products;
    this.filteredProducts = [...products];
  }

  filterByCategories(categories) {
    this.filteredProducts = filterByCategories(
      this.filteredProducts,
      categories,
    );
    return this;
  }

  filterByPriceRange(priceRange) {
    this.filteredProducts = filterByPriceRange(
      this.filteredProducts,
      priceRange,
    );
    return this;
  }
}

export default function useFilters(
  products,
  categoriesFilter,
  priceRangeIndex,
) {
  const priceRange =
    priceRangeIndex === null ? null : priceRanges[priceRangeIndex];
  const { filteredProducts } = new FilterChain(products)
    .filterByCategories(categoriesFilter)
    .filterByPriceRange(priceRange);

  return {
    filteredProducts,
    categoriesFilter,
    priceRangeIndex,
  };
}
