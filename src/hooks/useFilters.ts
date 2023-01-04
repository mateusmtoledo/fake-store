import { useState } from "react";
import { priceRanges, PriceRangeType } from "../components/Filters";
import { filterByCategories, filterByPriceRange } from "../utils/filterUtils";
import { Product } from "./useProducts";

class FilterChain {
  products: Array<Product>;
  filteredProducts: Array<Product>;

  constructor(products: Array<Product>) {
    this.products = products;
    this.filteredProducts = [...products];
  }

  filterByCategories(categories: Set<string>) {
    this.filteredProducts = filterByCategories(
      this.filteredProducts,
      categories
    );
    return this;
  }

  filterByPriceRange(priceRange: PriceRangeType | null) {
    this.filteredProducts = filterByPriceRange(
      this.filteredProducts,
      priceRange
    );
    return this;
  }
}

export default function useFilters(
  products: Array<Product>,
  priceRangeIndex: number | null
) {
  const [categoriesFilters, setCategoriesFilters] = useState<Set<string>>(
    new Set()
  );
  function addCategoryFilter(category: string) {
    setCategoriesFilters((prev) => new Set(prev).add(category));
  }
  function deleteCategoryFilter(category: string) {
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
