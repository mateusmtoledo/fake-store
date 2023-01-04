import { useState } from "react";
import { CartItemType } from "../contexts/CartContext";
import { Product } from "./useProducts";

export default function useCart() {
  const [cart, setCart] = useState<Array<CartItemType>>([]);

  function addToCart(product: Product) {
    setCart((prev) => {
      if (prev.some((item) => item.product.id === product.id)) return prev;
      return [...prev, { product, quantity: 1 }];
    });
  }

  function removeFromCart(productId: number) {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }

  function updateQuantity(productId: number, newQuantity: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      )
    );
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
  };
}
