export function getSortedProducts(products, sortBy) {
  const sortedProducts = [...products];
  switch (sortBy) {
    case 'rating+':
      return sortedProducts.sort((a, b) => a.rating.rate - b.rating.rate);
    case 'rating-':
      return sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    case 'price+':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'date+':
      return sortedProducts.sort((a, b) => Number(a.id) - Number(b.id));
    case 'date-':
      return sortedProducts.sort((a, b) => Number(b.id) - Number(a.id));
    default:
      throw new Error('Invalid sortBy argument');
  }
}
