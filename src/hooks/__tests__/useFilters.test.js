import { renderHook } from '@testing-library/react';
import useFilters from '../useFilters';
import products from '../../fakeData/products.json';
import { act } from 'react-dom/test-utils';

describe('useFilters', () => {
  it('initially returns unchanged list of products', () => {
    const { result } = renderHook(() => useFilters(products));
    expect(result.current.filteredProducts).toMatchObject(products);
  });

  it('filters by category', () => {
    const { result } = renderHook(() => useFilters(products));
    act(() => result.current.setCategoriesFilter("men's clothing"));
    expect(result.current.filteredProducts.length).toBe(4);
  });

  it('filters by price range', () => {
    const { result } = renderHook(() => useFilters(products));
    act(() => result.current.setPriceRangeIndex(3));
    expect(result.current.filteredProducts.length).toBe(3);
  });
});
