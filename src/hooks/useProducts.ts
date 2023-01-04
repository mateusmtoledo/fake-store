import { useEffect, useState } from "react";

export interface Product {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
}

export default function useProducts() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    setProductsLoading(true);
    fetch("https://fakestoreapi.com/products")
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
