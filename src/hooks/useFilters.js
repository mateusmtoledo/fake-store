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

export default function useFilters(products, priceRangeIndex) {
  const [categoriesFilters, setCategoriesFilters] = useState(new Set());
  function addCategoryFilter(category) {
    setCategoriesFilters((prev) => new Set(prev).add(category));
  }
  function deleteCategoryFilter(category) {
    setCategoriesFilters((prev) => {
      const newSet = new Set(prev);
      newSet.delete(category);
      return newSet;
    });
  }

  const priceRange =
    priceRangeIndex === null ? null : priceRanges[priceRangeIndex];
  const { filteredProducts } = new FilterChain(products)
    .filterByCategories(categoriesFilters)
    .filterByPriceRange(priceRange);

  return {
    filteredProducts,
    categoriesFilters,
    addCategoryFilter,
    deleteCategoryFilter,
    priceRangeIndex,
  };
}
