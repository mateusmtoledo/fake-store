import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ItemList from '../ItemList';
import { itemsPerPage } from '../ItemList';
import mockProducts from '../../fakeData/products.json';
import { CartContext } from '../../contexts/CartContext';

jest.mock('../Card', () => ({ item }) => (
  <div data-testid={item.id}>{'This is a card mock'}</div>
));

jest.mock('../../hooks/useProducts', () => () => ({
  products: mockProducts,
}));

const numberOfPages = Math.ceil(mockProducts.length / itemsPerPage);

describe('ItemList', () => {
  it('renders limited amount of items at a time', () => {
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ItemList />
      </CartContext.Provider>,
    );
    const displayedItems = screen.getAllByText('This is a card mock');
    expect(displayedItems.length).toBe(itemsPerPage);
  });

  it('initially renders first page', () => {
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ItemList />
      </CartContext.Provider>,
    );
    for (let i = 1; i <= itemsPerPage; i += 1) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
  });

  it('renders next page button', () => {
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ItemList />
      </CartContext.Provider>,
    );
    const nextPageButton = screen.getByTitle(/navigate to next page/i);
    expect(nextPageButton).toBeInTheDocument();
  });

  it('renders previous page button', () => {
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ItemList />
      </CartContext.Provider>,
    );
    userEvent.click(screen.getByTitle(/navigate to next page/i));
    const previousPageButton = screen.getByTitle(/navigate to previous page/i);
    expect(previousPageButton).toBeInTheDocument();
  });
});

describe('page number display', () => {
  it('correctly displays page numbers', () => {
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ItemList />
      </CartContext.Provider>,
    );
    const pageNumberDisplay = screen.getByText(/page/i);
    const nextPageButton = screen.getByTitle(/navigate to next page/i);
    expect(pageNumberDisplay).toHaveTextContent(`Page 1 of ${numberOfPages}`);
    userEvent.click(nextPageButton);
    expect(pageNumberDisplay).toHaveTextContent(`Page 2 of ${numberOfPages}`);
  });
});

describe('next page button', () => {
  it('renders next page when clicked', () => {
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ItemList />
      </CartContext.Provider>,
    );
    const nextPageButton = screen.getByTitle(/navigate to next page/i);
    for (let i = 1; i <= itemsPerPage; i += 1) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
    userEvent.click(nextPageButton);
    for (
      let i = itemsPerPage + 1;
      i < Math.min(itemsPerPage * 2, mockProducts.length);
      i += 1
    ) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
  });

  it('is not displayed at the last page', () => {
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ItemList />
      </CartContext.Provider>,
    );
    userEvent.click(screen.getByTitle(/navigate to next page/i));
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
    expect(
      screen.queryByTitle(/navigate to next page/i),
    ).not.toBeInTheDocument();
  });
});

describe('previous page button', () => {
  it('renders previous page when clicked', () => {
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ItemList />
      </CartContext.Provider>,
    );
    const nextPageButton = screen.getByTitle(/navigate to next page/i);
    userEvent.click(nextPageButton);
    const previousPageButton = screen.getByTitle(/navigate to previous page/i);
    userEvent.click(previousPageButton);
    for (let i = 1; i <= itemsPerPage; i += 1) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
  });

  it('is not displayed at the first page', () => {
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ItemList />
      </CartContext.Provider>,
    );
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    expect(
      screen.queryByTitle(/navigate to previous page/i),
    ).not.toBeInTheDocument();
  });
});
