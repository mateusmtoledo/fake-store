import { getSortedProducts } from '../utils/sortUtils';

export default function useSorting(products, sortBy) {
  const sortedProducts = getSortedProducts(products, sortBy);

  return {
    sortBy,
    sortedProducts,
  };
}
