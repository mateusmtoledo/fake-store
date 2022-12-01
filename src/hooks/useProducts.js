import { useEffect, useState } from 'react';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    setProductsLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((productsResponse) => {
        setProducts(productsResponse);
        setProductsLoading(false);
      });
  }, []);

  return {
    products,
    productsLoading,
  };
}
