import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Card from '../Card';

const fakeItem = {
    "id":1,
    "title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price":109.95,
    "description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category":"men's clothing",
    "image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating":{"rate":3.9,"count":120},
}

const addToCart = jest.fn();

describe('card', () => {
  it('renders item image', () => {
    render(<Card item={fakeItem} addToCart={addToCart} />);
    const image = screen.getByAltText('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg');
  });

  it('renders item title', () => {
    render(<Card item={fakeItem} addToCart={addToCart} />);
    const title = screen.getByText('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
    expect(title).toBeInTheDocument();
  });

  it('renders user ratings', () => {
    render(<Card item={fakeItem} addToCart={addToCart} />);
    const ratingText = screen.getByText(/3.9 \/ 5/);
    expect(ratingText).toBeInTheDocument();
  });

  it('renders item price', () => {
    render(<Card item={fakeItem} addToCart={addToCart} />);
    const price = screen.getByText('$109.95');
    expect(price).toBeInTheDocument();
  });

  it('renders Add to card button', () => {
    render(<Card item={fakeItem} addToCart={addToCart} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});

describe('button', () => {
  it('calls the addToCart function when clicked', () => {
    render(<Card item={fakeItem} addToCart={addToCart} />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(addToCart).toHaveBeenCalled();
  });
});
