import { useState } from 'react';

export default function usePages(products, itemsPerPage) {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const numberOfPages = Math.ceil(products.length / itemsPerPage) || 1;
  const startIndex = itemsPerPage * (currentPageNumber - 1);
  const endIndex = itemsPerPage * currentPageNumber;

  function goToNextPage() {
    setCurrentPageNumber((prev) => Math.min(numberOfPages, prev + 1));
  }

  function goToPreviousPage() {
    setCurrentPageNumber((prev) => Math.max(1, prev - 1));
  }

  function goToFirstPage() {
    setCurrentPageNumber(1);
  }

  const paginatedProducts = products.slice(startIndex, endIndex);

  return {
    currentPageNumber,
    numberOfPages,
    paginatedProducts,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
  };
}
