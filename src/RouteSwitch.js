import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Cart from "./components/Cart";
import ItemList from "./components/ItemList";

function RouteSwitch() {
  const [ itemArray, setItemArray ] = useState([]);
  const [ cartItems, setCartItems ] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const reponse = await fetch('https://fakestoreapi.com/products');
      const json = await reponse.json();
      setItemArray(json);
    }
    fetchItems();
  });

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="shop" element={<ItemList itemArray={itemArray} />} />
          <Route path="cart" element={<Cart cartItems={cartItems} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
