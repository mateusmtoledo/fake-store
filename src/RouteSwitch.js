import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Cart from './components/Cart';
import ItemList from './components/ItemList';
import Home from './components/Home';
import useCart from './hooks/useCart';

function RouteSwitch() {
  const [itemArray, setItemArray] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const reponse = await fetch('https://fakestoreapi.com/products');
      const json = await reponse.json();
      setItemArray(json);
    }
    fetchItems();
  });

  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App numberOfCartItems={cart.length} />}>
          <Route
            path="shop"
            element={<ItemList itemArray={itemArray} addToCart={addToCart} />}
          />
          <Route
            path="cart"
            element={
              <Cart
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
