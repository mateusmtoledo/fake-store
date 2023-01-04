import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import mockProducts from "../../fakeData/products.json";
import { CartContext } from "../../contexts/CartContext";
import ProductListPage, { productsPerPage } from "../ProductListPage";
import { Product } from "../../hooks/useProducts";

let fetchSpy: jest.SpyInstance;

beforeEach(() => {
  fetchSpy = jest
    .spyOn(global, "fetch")
    .mockImplementation(
      jest.fn(() =>
        Promise.resolve({ json: () => Promise.resolve(mockProducts) })
      ) as jest.Mock
    );
});

jest.mock("../ProductCard", () => ({ product }: { product: Product }) => (
  <div data-testid={product.id}>{"This is a card mock"}</div>
));

const cartContextValue = {
  cart: [],
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  updateQuantity: jest.fn(),
};

const numberOfPages = Math.ceil(mockProducts.length / productsPerPage);

describe("ProductList", () => {
  it("renders limited amount of items at a time", async () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductListPage />
      </CartContext.Provider>
    );
    await waitFor(() =>
      expect(screen.queryByTestId("card-skeleton")).not.toBeInTheDocument()
    );
    const displayedItems = screen.getAllByText("This is a card mock");
    expect(displayedItems.length).toBe(productsPerPage);
  });

  it("initially renders first page", async () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductListPage />
      </CartContext.Provider>
    );
    await waitFor(() =>
      expect(screen.queryByTestId("card-skeleton")).not.toBeInTheDocument()
    );
    for (
      let i = mockProducts.length;
      i <= mockProducts.length - productsPerPage;
      i += 1
    ) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
  });

  it("renders next page button", async () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductListPage />
      </CartContext.Provider>
    );
    await waitFor(() =>
      expect(screen.queryByTestId("card-skeleton")).not.toBeInTheDocument()
    );
    const nextPageButton = screen.getByTitle(/navigate to next page/i);
    expect(nextPageButton).toBeInTheDocument();
  });

  it("renders previous page button", async () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductListPage />
      </CartContext.Provider>
    );
    await waitFor(() =>
      expect(screen.queryByTestId("card-skeleton")).not.toBeInTheDocument()
    );
    userEvent.click(screen.getByTitle(/navigate to next page/i));
    const previousPageButton = await screen.findByTitle(
      /navigate to previous page/i
    );
    expect(previousPageButton).toBeInTheDocument();
  });

  it("renders no results message when array length is 0", async () => {
    fetchSpy.mockImplementation(
      jest.fn(() =>
        Promise.resolve({ json: () => Promise.resolve([]) })
      ) as jest.Mock
    );
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductListPage />
      </CartContext.Provider>
    );
    await waitFor(() =>
      expect(screen.queryByTestId("card-skeleton")).not.toBeInTheDocument()
    );
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });
});

describe("page number display", () => {
  it("correctly displays page numbers", async () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductListPage />
      </CartContext.Provider>
    );
    await waitFor(() =>
      expect(screen.queryByTestId("card-skeleton")).not.toBeInTheDocument()
    );
    const pageNumberDisplay = screen.getByText(/page/i);
    const nextPageButton = screen.getByTitle(/navigate to next page/i);
    expect(pageNumberDisplay).toHaveTextContent(`Page 1 of ${numberOfPages}`);
    userEvent.click(nextPageButton);
    expect(pageNumberDisplay).toHaveTextContent(`Page 2 of ${numberOfPages}`);
  });
});

describe("next page button", () => {
  it("renders next page when clicked", async () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductListPage />
      </CartContext.Provider>
    );
    await waitFor(() =>
      expect(screen.queryByTestId("card-skeleton")).not.toBeInTheDocument()
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

  it("is not displayed at the last page", async () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductListPage />
      </CartContext.Provider>
    );
    await waitFor(() =>
      expect(screen.queryByTestId("card-skeleton")).not.toBeInTheDocument()
    );
    userEvent.click(screen.getByTitle(/navigate to next page/i));
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    expect(
      screen.queryByTitle(/navigate to next page/i)
    ).not.toBeInTheDocument();
  });
});

describe("previous page button", () => {
  it("renders previous page when clicked", async () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductListPage />
      </CartContext.Provider>
    );
    await waitFor(() =>
      expect(screen.queryByTestId("card-skeleton")).not.toBeInTheDocument()
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

  it("is not displayed at the first page", async () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductListPage />
      </CartContext.Provider>
    );
    await waitFor(() =>
      expect(screen.queryByTestId("card-skeleton")).not.toBeInTheDocument()
    );
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    expect(
      screen.queryByTitle(/navigate to previous page/i)
    ).not.toBeInTheDocument();
  });
});

describe("ItemList skeleton", () => {
  it("is displayed when content is loading", async () => {
    fetchSpy.mockImplementation(
      jest.fn(() =>
        Promise.resolve({ json: () => Promise.resolve([]) })
      ) as jest.Mock
    );
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductListPage />
      </CartContext.Provider>
    );
    const cardSkeletons = await screen.findAllByTestId("card-skeleton");
    expect(cardSkeletons.length).toBe(12);
    await waitFor(() =>
      expect(screen.queryByTestId("card-skeleton")).not.toBeInTheDocument()
    );
  });
});
