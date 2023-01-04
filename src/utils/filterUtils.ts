import { PriceRangeType } from "../components/Filters";
import { Product } from "../hooks/useProducts";

export function filterByCategories(
  products: Array<Product>,
  categories?: Set<string>
) {
  if (!(categories instanceof Set)) {
    throw new Error(
      "Categories should be a Set, instead received " + categories
    );
  }
  if (categories.size === 0) return products;
  return products.filter((product) => categories.has(product.category));
}

export function filterByPriceRange(
  products: Array<Product>,
  priceRange: PriceRangeType | null
) {
  if (priceRange === null) return products;
  return products.filter(
    (product) =>
      (!priceRange.min || product.price >= priceRange.min) &&
      (!priceRange.max || product.price <= priceRange.max)
  );
}
