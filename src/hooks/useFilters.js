import { useState } from 'react';
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

export default function useFilters(products) {
  const [categoriesFilter, setCategoriesFilter] = useState(null);
  const [priceRangeIndex, setPriceRangeIndex] = useState(null);
  const priceRange =
    priceRangeIndex === null ? null : priceRanges[priceRangeIndex];
  const { filteredProducts } = new FilterChain(products)
    .filterByCategories(categoriesFilter)
    .filterByPriceRange(priceRange);

  return {
    filteredProducts,
    categoriesFilter,
    setCategoriesFilter,
    priceRangeIndex,
    setPriceRangeIndex,
  };
}
