export function filterByCategories(products, categories) {
  if (!(categories instanceof Set)) {
    throw new Error(
      'Categories should be a Set, instead received ' + categories,
    );
  }
  if (categories.size === 0) return products;
  return products.filter((product) => categories.has(product.category));
}

export function filterByPriceRange(products, priceRange) {
  if (priceRange === null) return products;
  if (priceRange?.min === undefined || priceRange?.max === undefined) {
    throw new Error(
      'Price range should be an object { min, max }, instead received ' +
        typeof priceRange,
    );
  }
  return products.filter(
    (product) =>
      (!priceRange.min || product.price >= priceRange.min) &&
      (!priceRange.max || product.price <= priceRange.max),
  );
}
