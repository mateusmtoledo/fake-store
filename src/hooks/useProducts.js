import { useEffect, useState } from 'react';

export default function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((productsResponse) => setProducts(productsResponse));
  }, []);

  return {
    products,
  };
}
