import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartItem from '../CartItem';

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

describe('CartItem', () => {
  it('renders an image of the product', () => {
    render(<CartItem item={fakeCartItem} />);
    const image = screen.getByRole('img');
    expect(image.src).toBe(fakeCartItem.product.image);
  });

  it('renders the product title', () => {
    render(<CartItem item={fakeCartItem} />);
    const title = screen.getByText(fakeCartItem.product.title);
    expect(title).toBeInTheDocument();
  });
  
  it('renders the product price', () => {
    render(<CartItem item={fakeCartItem} />);
    const price = screen.getByText(/price per unit/i);
    expect(price).toHaveTextContent(fakeCartItem.product.price);
  });

  it('renders the item quantity', () => {
    render(<CartItem item={fakeCartItem} />);
    const quantity = screen.getByLabelText(/quantity/i);
    expect(quantity.value).toBe(fakeCartItem.quantity.toString());
  });

  it('renders total value', () => {
    render(<CartItem item={fakeCartItem} />);
    const totalPrice = screen.getByTitle(/total item cost/i);
    expect(totalPrice).toHaveTextContent(fakeCartItem.product.price * fakeCartItem.quantity);
  });
});
