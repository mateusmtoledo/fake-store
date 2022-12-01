import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from '../Cart';
import { MemoryRouter } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

jest.mock('../CartItem', () => () => <div>{'This is a fake cart item'}</div>);

const cart = new Array(5).fill().map((_, i) => ({
  product: {
    id: i,
    price: 53.23 - i,
  },
  quantity: 6 - i,
}));

describe('cart', () => {
  it('renders every cart item', () => {
    render(
      <CartContext.Provider
        value={{ cart: cart, addToCard: jest.fn(), removeFromCart: jest.fn() }}
      >
        <MemoryRouter>
          <Cart cart={cart} />
        </MemoryRouter>
      </CartContext.Provider>,
    );
    const renderedItems = screen.getAllByText('This is a fake cart item');
    expect(renderedItems.length).toBe(cart.length);
  });

  it('displays correct total order value', () => {
    render(
      <CartContext.Provider
        value={{ cart: cart, addToCard: jest.fn(), removeFromCart: jest.fn() }}
      >
        <MemoryRouter>
          <Cart cart={cart} />
        </MemoryRouter>
      </CartContext.Provider>,
    );
    const totalPriceElement = screen.getByText(/order total/i);
    expect(totalPriceElement).toBeInTheDocument();
    expect(screen.getByText(/1034.6/)).toBeInTheDocument();
  });

  it('renders checkout button', () => {
    render(
      <CartContext.Provider
        value={{ cart: cart, addToCard: jest.fn(), removeFromCart: jest.fn() }}
      >
        <MemoryRouter>
          <Cart cart={cart} />
        </MemoryRouter>
      </CartContext.Provider>,
    );
    const checkoutButton = screen.getByText(/checkout/i);
    expect(checkoutButton).toBeInTheDocument();
  });

  it('renders continue shopping button', () => {
    render(
      <CartContext.Provider
        value={{ cart: cart, addToCard: jest.fn(), removeFromCart: jest.fn() }}
      >
        <MemoryRouter>
          <Cart cart={cart} />
        </MemoryRouter>
      </CartContext.Provider>,
    );
    const continueShoppingButton = screen.getByText(/continue shopping/i);
    expect(continueShoppingButton).toBeInTheDocument();
  });

  it('renders message when cart is empty', () => {
    render(
      <CartContext.Provider
        value={{ cart: [], addToCard: jest.fn(), removeFromCart: jest.fn() }}
      >
        <MemoryRouter>
          <Cart cart={cart} />
        </MemoryRouter>
      </CartContext.Provider>,
    );
    const emptyCartMessage = screen.getByText(/your cart is empty/i);
    expect(emptyCartMessage).toBeInTheDocument();
  });
});
