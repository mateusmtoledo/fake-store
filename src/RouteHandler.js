import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductListPage from './components/ProductListPage';
import CartPage from './components/CartPage';
import HomePage from './components/HomePage';

export default function RouteHandler() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="shop" element={<ProductListPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route index element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
