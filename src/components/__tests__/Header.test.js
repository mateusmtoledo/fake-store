import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import Header from '../Header';

const cart = new Array(5).fill().map((_, i) => ({
  product: {
    id: i,
  },
  quantity: i,
}));

describe('Header', () => {
  it('renders logo', () => {
    render(
      <CartContext.Provider
        value={{ cart: cart, addToCard: jest.fn(), removeFromCart: jest.fn() }}
      >
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartContext.Provider>,
    );
    expect(screen.getByText(/^fake store$/i)).toBeInTheDocument();
  });

  it('renders links', () => {
    render(
      <CartContext.Provider
        value={{ cart: cart, addToCard: jest.fn(), removeFromCart: jest.fn() }}
      >
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartContext.Provider>,
    );
    const hrefs = screen.getAllByRole('link').map((link) => link.href);
    [
      'http://localhost/',
      'http://localhost/cart',
      'http://localhost/shop',
    ].forEach((url) => expect(hrefs).toContain(url));
  });

  it('renders number of items in the cart', () => {
    render(
      <CartContext.Provider
        value={{ cart: cart, addToCard: jest.fn(), removeFromCart: jest.fn() }}
      >
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartContext.Provider>,
    );
    expect(screen.getByText(5)).toBeInTheDocument();
  });
});
