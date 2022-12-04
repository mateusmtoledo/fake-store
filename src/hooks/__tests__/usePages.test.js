import { renderHook } from '@testing-library/react';
import usePages from '../usePages';
import products from '../../fakeData/products.json';
import { act } from 'react-dom/test-utils';

describe('usePages', () => {
  it('returns first page when first called', () => {
    const { result } = renderHook(() => usePages(products, 12));
    expect(result.current.currentPageNumber).toBe(1);
    expect(
      result.current.paginatedProducts.every(
        (product) => Number(product.id) <= 12,
      ),
    ).toBe(true);
    expect(result.current.paginatedProducts.length).toBe(12);
  });

  it('returns correct number of pages', () => {
    const { result } = renderHook(() => usePages(products, 12));
    expect(result.current.numberOfPages).toBe(2);
  });

  describe('goToNextPage', () => {
    it('sets next page', async () => {
      const { result } = renderHook(() => usePages(products, 12));
      act(() => result.current.goToNextPage());
      expect(result.current.currentPageNumber).toBe(2);
      expect(
        result.current.paginatedProducts.every(
          (product) => Number(product.id) >= 13 && Number(product.id) <= 20,
        ),
      ).toBe(true);
      expect(result.current.paginatedProducts.length).toBe(8);
    });
  });

  describe('goToPreviousPage', () => {
    it('sets previous page', () => {
      const { result } = renderHook(() => usePages(products, 12));
      act(() => result.current.goToNextPage());
      expect(result.current.currentPageNumber).toBe(2);
      expect(result.current.paginatedProducts.length).toBe(8);
      act(() => result.current.goToPreviousPage());
      expect(result.current.currentPageNumber).toBe(1);
      expect(
        result.current.paginatedProducts.every(
          (product) => Number(product.id) <= 12,
        ),
      ).toBe(true);
      expect(result.current.paginatedProducts.length).toBe(12);
    });
  });

  describe('goToFirstPage', () => {
    it('sets first page', () => {
      const { result } = renderHook(() => usePages(products, 12));
      act(() => result.current.goToNextPage());
      expect(result.current.currentPageNumber).toBe(2);
      expect(result.current.paginatedProducts.length).toBe(8);
      act(() => result.current.goToFirstPage());
      expect(result.current.currentPageNumber).toBe(1);
      expect(
        result.current.paginatedProducts.every(
          (product) => Number(product.id) <= 12,
        ),
      ).toBe(true);
      expect(result.current.paginatedProducts.length).toBe(12);
    });
  });
});
