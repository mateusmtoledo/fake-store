import { getSortedProducts } from '../sortUtils';
import products from '../../fakeData/products.json';

describe('useSorting', () => {
  it('does not mutate original array', () => {
    const sortBy = 'price+';
    const originalArray = [...products];
    const sortedArray = getSortedProducts(originalArray, sortBy);
    expect(sortedArray[0].price).toBe(7.95);
    expect(originalArray[0].price).toBe(109.95);
  });

  it('sorts ascending by price', () => {
    const sortBy = 'price+';
    const sortedProducts = getSortedProducts(products, sortBy);
    expect(sortedProducts[0].price).toBe(7.95);
  });

  it('sorts descending by price', () => {
    const sortBy = 'price-';
    const sortedProducts = getSortedProducts(products, sortBy);
    expect(sortedProducts[0].price).toBe(999.99);
  });

  it('sorts ascending by rating', () => {
    const sortBy = 'rating+';
    const sortedProducts = getSortedProducts(products, sortBy);
    expect(sortedProducts[0].rating.rate).toBe(1.9);
  });

  it('sorts descending by rating', () => {
    const sortBy = 'rating-';
    const sortedProducts = getSortedProducts(products, sortBy);
    expect(sortedProducts[0].rating.rate).toBe(4.8);
  });

  it('sorts ascending by date', () => {
    const sortBy = 'date+';
    const sortedProducts = getSortedProducts(products, sortBy);
    expect(sortedProducts[0].id).toBe(1);
  });

  it('sorts descending by date', () => {
    const sortBy = 'date-';
    const sortedProducts = getSortedProducts(products, sortBy);
    expect(sortedProducts[0].id).toBe(20);
  });

  it('throws error when sortBy argument is invalid', () => {
    const sortBy = 'some invalid argument';
    expect(() => getSortedProducts(products, sortBy)).toThrow();
  });
});
