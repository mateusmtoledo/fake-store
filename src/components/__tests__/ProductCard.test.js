import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ProductCard from '../ProductCard';
import { CartContext } from '../../contexts/CartContext';

const fakeProduct = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description:
    'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: { rate: 3.9, count: 120 },
};

const props = {
  product: fakeProduct,
};

const cartContextValue = {
  cart: [],
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
};

describe('card', () => {
  it('renders product image', () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductCard {...props} />
      </CartContext.Provider>,
    );
    const image = screen.getByAltText(
      'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    );
  });

  it('renders product title', () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductCard {...props} />
      </CartContext.Provider>,
    );
    const title = screen.getByText(
      'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    );
    expect(title).toBeInTheDocument();
  });

  it('renders user ratings', () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductCard {...props} />
      </CartContext.Provider>,
    );
    const ratingText = screen.getByText(/3.9 \/ 5/);
    expect(ratingText).toBeInTheDocument();
  });

  it('renders product price', () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductCard {...props} />
      </CartContext.Provider>,
    );
    const price = screen.getByText('$109.95');
    expect(price).toBeInTheDocument();
  });

  it('renders add to card button when item is not in the cart', () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductCard {...props} />
      </CartContext.Provider>,
    );
    expect(screen.getByLabelText(/add to cart/i)).toBeInTheDocument();
  });

  it('renders added to card button when item is in the cart', () => {
    render(
      <CartContext.Provider
        value={{
          ...cartContextValue,
          cart: [
            {
              product: fakeProduct,
              quantity: 3,
            },
          ],
        }}
      >
        <ProductCard {...props} />
      </CartContext.Provider>,
    );
    expect(screen.getByLabelText(/remove from cart/i)).toBeInTheDocument();
  });
});

describe('add to cart button', () => {
  it('calls addToCart with correct arguments when clicked', () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductCard {...props} />
      </CartContext.Provider>,
    );
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(cartContextValue.addToCart).toBeCalledWith(props.product);
  });
});

describe('remove from cart button', () => {
  it('calls removeFromCart with correct arguments when clicked', () => {
    render(
      <CartContext.Provider
        value={{
          ...cartContextValue,
          cart: [
            {
              product: fakeProduct,
              quantity: 3,
            },
          ],
        }}
      >
        <ProductCard {...props} />
      </CartContext.Provider>,
    );
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(cartContextValue.removeFromCart).toBeCalledWith(fakeProduct.id);
  });
});
