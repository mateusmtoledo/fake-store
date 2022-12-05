import { renderHook } from '@testing-library/react';
import useFilters from '../useFilters';
import products from '../../fakeData/products.json';

describe('useFilters', () => {
  it('returns unchanged list of products when arguments are null', () => {
    const { result } = renderHook(() => useFilters(products, null, null));
    expect(result.current.filteredProducts).toMatchObject(products);
  });

  it('filters by category', () => {
    const { result } = renderHook(() =>
      useFilters(products, "men's clothing", null),
    );
    expect(result.current.filteredProducts.length).toBe(4);
  });

  it('filters by price range', () => {
    const { result } = renderHook(() => useFilters(products, null, 3));
    expect(result.current.filteredProducts.length).toBe(3);
  });
});
