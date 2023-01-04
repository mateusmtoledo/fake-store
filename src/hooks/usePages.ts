import { useCallback, useState } from "react";
import { Product } from "./useProducts";

export default function usePages(
  products: Array<Product>,
  productsPerPage: number
) {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const numberOfPages = Math.ceil(products.length / productsPerPage) || 1;
  const startIndex = productsPerPage * (currentPageNumber - 1);
  const endIndex = productsPerPage * currentPageNumber;

  function goToNextPage() {
    setCurrentPageNumber((prev) => Math.min(numberOfPages, prev + 1));
  }

  function goToPreviousPage() {
    setCurrentPageNumber((prev) => Math.max(1, prev - 1));
  }

  const goToFirstPage = useCallback(() => setCurrentPageNumber(1), []);

  const paginatedProducts = products.slice(startIndex, endIndex);

  return {
    currentPageNumber,
    numberOfPages,
    paginatedProducts,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    firstProductNumber: Math.min(products.length, startIndex + 1),
    lastProductNumber: Math.min(products.length, endIndex),
  };
}
