import { filterByCategories, filterByPriceRange } from '../filterUtils';
import products from '../../fakeData/products.json';

describe('filterByCategoryArray', () => {
  it('returns original array if categories argument is null', () => {
    const filteredProducts = filterByCategories(products, null);
    expect(filteredProducts.length).toBe(20);
  });

  it('returns original array if category array is empty', () => {
    const filteredProducts = filterByCategories(products, []);
    expect(filteredProducts.length).toBe(20);
  });

  it('filters items by categories', () => {
    const filteredProducts = filterByCategories(products, ["men's clothing"]);
    expect(filteredProducts.length).toBe(4);
    expect(
      filteredProducts.every(
        (product) => product.category === "men's clothing",
      ),
    ).toBe(true);
  });

  it('filters by multiple categories', () => {
    const filteredProducts = filterByCategories(products, [
      "men's clothing",
      "women's clothing",
    ]);
    expect(filteredProducts.length).toBe(10);
    expect(
      filteredProducts.every(
        (product) =>
          product.category === "men's clothing" ||
          product.category === "women's clothing",
      ),
    ).toBe(true);
  });

  it('accepts single category as string', () => {
    const filteredProducts = filterByCategories(products, "men's clothing");
    expect(filteredProducts.length).toBe(4);
    expect(
      filteredProducts.every(
        (product) => product.category === "men's clothing",
      ),
    ).toBe(true);
  });
});

describe('filterByPriceRange', () => {
  it('returns original array if range argument is null', () => {
    const filteredProducts = filterByPriceRange(products, null);
    expect(filteredProducts.length).toBe(20);
  });

  it('filters by price range', () => {
    const filteredProducts = filterByPriceRange(products, {
      min: 10.35,
      max: 50.23,
    });
    expect(filteredProducts.length).toBe(6);
    expect(
      filteredProducts.every(
        (product) => product.price >= 10.35 && product.price <= 50.23,
      ),
    ).toBe(true);
  });

  it('works with maximum only', () => {
    const filteredProducts = filterByPriceRange(products, {
      min: null,
      max: 10,
    });
    expect(filteredProducts.length).toBe(3);
    expect(filteredProducts.every((product) => product.price <= 10)).toBe(true);
  });
});
