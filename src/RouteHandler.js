import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import ItemList from './components/ItemList';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';

export default function RouteHandler() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="shop" element={<ItemList />} />
          <Route path="cart" element={<Cart />} />
          <Route index element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
