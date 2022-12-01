import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartItem from '../CartItem';
import userEvent from "@testing-library/user-event";

const fakeCartItem = {
  product: {
    "id":1,
    "title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price":109.95,
    "description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category":"men's clothing",
    "image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating":{"rate":3.9,"count":120},
  },
  quantity: 3,
}

const removeFromCart = jest.fn();
const updateQuantity = jest.fn();

describe('CartItem', () => {
  it('renders an image of the product', () => {
    render(<CartItem item={fakeCartItem} updateQuantity={updateQuantity} />);
    const image = screen.getByAltText(fakeCartItem.product.title);
    expect(image.src).toBe(fakeCartItem.product.image);
  });

  it('renders the product title', () => {
    render(<CartItem item={fakeCartItem} updateQuantity={updateQuantity} />);
    const title = screen.getByText(fakeCartItem.product.title);
    expect(title).toBeInTheDocument();
  });
  
  it('renders the product price', () => {
    render(<CartItem item={fakeCartItem} updateQuantity={updateQuantity} />);
    const price = screen.getByText(/price per unit/i);
    expect(price).toHaveTextContent(fakeCartItem.product.price);
  });

  it('renders the item quantity', () => {
    render(<CartItem item={fakeCartItem} updateQuantity={updateQuantity} />);
    const quantity = screen.getByLabelText(/quantity/i);
    expect(quantity.value).toBe(fakeCartItem.quantity.toString());
  });

  it('renders total value', () => {
    render(<CartItem item={fakeCartItem} updateQuantity={updateQuantity} />);
    const totalPrice = screen.getByTitle(/total item cost/i);
    expect(totalPrice).toHaveTextContent(fakeCartItem.product.price * fakeCartItem.quantity);
  });

  it('correctly updates the input', () => {
    render(<CartItem item={fakeCartItem} updateQuantity={updateQuantity} />);
    const quantityInput = screen.getByRole('spinbutton');
    userEvent.type(quantityInput, "3");
    expect(updateQuantity).toHaveBeenCalled();
    expect(quantityInput.value).toBe("3");
  });
});

describe('remove button', () => {
  it('calls the removeFromCart function', () => {
    render(<CartItem item={fakeCartItem} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />);
    const removeButton = screen.getByText(/remove/i);
    userEvent.click(removeButton);
    expect(removeFromCart).toHaveBeenCalled();
  });
});
