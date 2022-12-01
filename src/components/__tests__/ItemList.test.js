import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ItemList from '../ItemList';
import { itemsPerPage } from '../ItemList';
import products from '../../fakeData/products.json';

jest.mock('../Card', () => ({ item }) => (
  <div data-testid={item.id}>{'This is a card mock'}</div>
));

const numberOfPages = Math.ceil(products.length / itemsPerPage);

describe('ItemList', () => {
  it('renders limited amount of items at a time', () => {
    render(<ItemList products={products} />);
    const displayedItems = screen.getAllByText('This is a card mock');
    expect(displayedItems.length).toBe(itemsPerPage);
  });

  it('initially renders first page', () => {
    render(<ItemList products={products} />);
    for (let i = 1; i <= itemsPerPage; i += 1) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
  });

  it('renders next page button', () => {
    render(<ItemList products={products} />);
    const nextPageButton = screen.getByText('>');
    expect(nextPageButton).toBeInTheDocument();
  });

  it('renders previous page button', () => {
    render(<ItemList products={products} />);
    const previousPageButton = screen.getByText('<');
    expect(previousPageButton).toBeInTheDocument();
  });
});

describe('page number display', () => {
  it('correctly displays page numbers', () => {
    render(<ItemList products={products} />);
    const pageNumberDisplay = screen.getByText(/page/i);
    const nextPageButton = screen.getByText('>');
    expect(pageNumberDisplay).toHaveTextContent(`Page 1 of ${numberOfPages}`);
    userEvent.click(nextPageButton);
    expect(pageNumberDisplay).toHaveTextContent(`Page 2 of ${numberOfPages}`);
  });
});

describe('next page button', () => {
  it('renders next page when clicked', () => {
    render(<ItemList products={products} />);
    const nextPageButton = screen.getByText('>');
    for (let i = 1; i <= itemsPerPage; i += 1) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
    userEvent.click(nextPageButton);
    for (
      let i = itemsPerPage + 1;
      i < Math.min(itemsPerPage * 2, products.length);
      i += 1
    ) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
  });

  it('does not go further than last page', () => {
    render(<ItemList products={products} />);
    const nextPageButton = screen.getByText('>');
    for (let i = 1; i <= numberOfPages; i += 1) {
      userEvent.click(nextPageButton);
    }
    const expectedStartIndex = itemsPerPage * (numberOfPages - 1) + 1;
    const expectedEndIndex = Math.min(
      itemsPerPage * numberOfPages,
      products.length,
    );
    for (let i = expectedStartIndex; i < expectedEndIndex; i += 1) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
    expect(screen.getByText(/page/i)).toHaveTextContent(
      `Page ${numberOfPages} of ${numberOfPages}`,
    );
  });
});

describe('previous page button', () => {
  it('renders previous page when clicked', () => {
    render(<ItemList products={products} />);
    const previousPageButton = screen.getByText('<');
    const nextPageButton = screen.getByText('>');
    userEvent.click(nextPageButton);
    userEvent.click(previousPageButton);
    for (let i = 1; i <= itemsPerPage; i += 1) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
  });

  it('does not go below first page', () => {
    render(<ItemList products={products} />);
    const previousPageButton = screen.getByText('<');
    userEvent.click(previousPageButton);
    userEvent.click(previousPageButton);
    for (let i = 1; i <= itemsPerPage; i += 1) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
    expect(screen.getByText(/page/i)).toHaveTextContent(
      `Page 1 of ${numberOfPages}`,
    );
  });
});
