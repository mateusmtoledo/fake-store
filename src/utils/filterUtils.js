export function filterByCategories(products, categories) {
  if (categories === null) return products;
  let categoriesArr = categories;
  if (typeof categories === 'string') {
    categoriesArr = [categories];
  }
  if (Array.isArray(categoriesArr)) {
    return categoriesArr.length
      ? products.filter((product) => categoriesArr.includes(product.category))
      : products;
  } else
    throw new Error(
      'Categories should have type Array or string, but received ' + categories,
    );
}

export function filterByPriceRange(products, priceRange) {
  if (priceRange === null) return products;
  return products.filter(
    (product) =>
      (!priceRange.min || product.price >= priceRange.min) &&
      (!priceRange.max || product.price <= priceRange.max),
  );
}
