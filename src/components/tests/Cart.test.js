import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cart from '../Cart';
import { MemoryRouter } from "react-router-dom";

jest.mock('../CartItem', () => () => (
  <div>{'This is a fake cart item'}</div>
));

const cartItems = [];
let totalValue = 0;

for(let i = 0; i < 5; i += 1) {
  const id = i;
  const price = 53.23 - i;
  const quantity = 6 - i;

  cartItems.push({
    product: {
      id,
      price,
    },
    quantity,
  });

  totalValue += (price * quantity);
}

describe('cart', () => {
  it('renders every cart item', () => {
    render(
      <MemoryRouter>
        <Cart cartItems={cartItems} />
      </MemoryRouter>
    );
    const renderedItems = screen.getAllByText('This is a fake cart item');
    expect(renderedItems.length).toBe(cartItems.length);
  });

  it('displays correct total order value', () => {
    render(
      <MemoryRouter>
        <Cart cartItems={cartItems} />
      </MemoryRouter>
    );
    const totalPriceElement = screen.getByText(/order total/i);
    expect(totalPriceElement).toBeInTheDocument();
    expect(totalPriceElement).toHaveTextContent(`$${totalValue}`);
  });

  it('renders checkout button', () => {
    render(
      <MemoryRouter>
        <Cart cartItems={cartItems} />
      </MemoryRouter>
    );
    const checkoutButton = screen.getByText(/checkout/i);
    expect(checkoutButton).toBeInTheDocument();
  });

  it('renders continue shopping button', () => {
    render(
      <MemoryRouter>
        <Cart cartItems={cartItems} />
      </MemoryRouter>
    );
    const continueShoppingButton = screen.getByText(/continue shopping/i);
    expect(continueShoppingButton).toBeInTheDocument();
  });
});
