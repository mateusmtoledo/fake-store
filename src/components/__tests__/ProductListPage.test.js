import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import mockProducts from '../../fakeData/products.json';
import { CartContext } from '../../contexts/CartContext';
import * as useProducts from '../../hooks/useProducts';
import ProductListPage, { productsPerPage } from '../ProductListPage';

jest.mock('../../hooks/useProducts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

beforeEach(() => {
  useProducts.default.mockReturnValue({
    products: mockProducts,
    productsLoading: false,
  });
});

jest.mock('../ProductCard', () => ({ product }) => (
  <div data-testid={product.id}>{'This is a card mock'}</div>
));

const numberOfPages = Math.ceil(mockProducts.length / productsPerPage);

describe('ProductList', () => {
  it('renders limited amount of items at a time', () => {
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ProductListPage />
      </CartContext.Provider>,
    );
    const displayedItems = screen.getAllByText('This is a card mock');
    expect(displayedItems.length).toBe(productsPerPage);
  });

  it('initially renders first page', () => {
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ProductListPage />
      </CartContext.Provider>,
    );
    for (
      let i = mockProducts.length;
      i <= mockProducts.length - productsPerPage;
      i += 1
    ) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
  });

  it('renders next page button', () => {
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ProductListPage />
      </CartContext.Provider>,
    );
    const nextPageButton = screen.getByTitle(/navigate to next page/i);
    expect(nextPageButton).toBeInTheDocument();
  });

  it('renders previous page button', () => {
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ProductListPage />
      </CartContext.Provider>,
    );
    userEvent.click(screen.getByTitle(/navigate to next page/i));
    const previousPageButton = screen.getByTitle(/navigate to previous page/i);
    expect(previousPageButton).toBeInTheDocument();
  });

  it('renders no results message when array length is 0', () => {
    useProducts.default.mockReturnValue({
      products: [],
      productsLoading: false,
    });
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ProductListPage />
      </CartContext.Provider>,
    );
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });
});

describe('page number display', () => {
  it('correctly displays page numbers', () => {
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ProductListPage />
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
        <ProductListPage />
      </CartContext.Provider>,
    );
    const nextPageButton = screen.getByTitle(/navigate to next page/i);
    for (
      let i = mockProducts.length;
      i <= mockProducts.length - productsPerPage;
      i += 1
    ) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
    userEvent.click(nextPageButton);
    for (
      let i = mockProducts.length - productsPerPage + 1;
      i < Math.max(mockProducts.length - 2 * productsPerPage, 1);
      i += 1
    ) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
  });

  it('is not displayed at the last page', () => {
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ProductListPage />
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
        <ProductListPage />
      </CartContext.Provider>,
    );
    const nextPageButton = screen.getByTitle(/navigate to next page/i);
    userEvent.click(nextPageButton);
    const previousPageButton = screen.getByTitle(/navigate to previous page/i);
    userEvent.click(previousPageButton);
    for (
      let i = mockProducts.length;
      i <= mockProducts.length - productsPerPage;
      i += 1
    ) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
  });

  it('is not displayed at the first page', () => {
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ProductListPage />
      </CartContext.Provider>,
    );
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    expect(
      screen.queryByTitle(/navigate to previous page/i),
    ).not.toBeInTheDocument();
  });
});

describe('ItemList skeleton', () => {
  it('is displayed when content is loading', async () => {
    useProducts.default.mockReturnValue({
      products: [],
      productsLoading: true,
    });
    render(
      <CartContext.Provider value={{ addToCard: jest.fn() }}>
        <ProductListPage />
      </CartContext.Provider>,
    );
    const cardSkeletons = await screen.findAllByTestId('card-skeleton');
    expect(cardSkeletons.length).toBe(12);
  });
});
