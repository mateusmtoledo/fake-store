import { useState } from 'react';

export default function useCart() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prev) => {
      if (prev.some((item) => item.product.id === product.id)) return prev;
      return [...prev, { product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }

  function updateQuantity(productId, newQuantity) {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item,
      ),
    );
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
  };
}
