import { createContext } from "react";
import { Product } from "../hooks/useProducts";

export interface CartItemType {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cart: Array<CartItemType>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
}

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);
