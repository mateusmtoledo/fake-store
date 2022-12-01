import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Cart from './components/Cart';
import ItemList from './components/ItemList';
import Home from './components/Home';
import useCart from './hooks/useCart';
import useProducts from './hooks/useProducts';
import { CartContext } from './contexts/CartContext';

function RouteSwitch() {
  const { products } = useProducts();

  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="shop" element={<ItemList products={products} />} />
            <Route path="cart" element={<Cart />} />
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default RouteSwitch;
