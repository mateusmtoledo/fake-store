import { CartContext } from "./contexts/CartContext";
import useCart from "./hooks/useCart";
import RouteHandler from "./RouteHandler";

export default function App() {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      <RouteHandler />
    </CartContext.Provider>
  );
}
