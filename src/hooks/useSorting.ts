import { getSortedProducts } from "../utils/sortUtils";
import { Product } from "./useProducts";

export default function useSorting(products: Array<Product>, sortBy: string) {
  const sortedProducts = getSortedProducts(products, sortBy);

  return {
    sortBy,
    sortedProducts,
  };
}
