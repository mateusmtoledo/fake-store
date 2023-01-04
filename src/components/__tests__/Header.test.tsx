import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import Header from "../Header";
import products from "../../fakeData/products.json";

const cart = new Array(5).fill(null).map((_, i) => ({
  product: products[i],
  quantity: i,
}));

describe("Header", () => {
  it("renders logo", () => {
    render(
      <CartContext.Provider value={{ cart: cart }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartContext.Provider>
    );
    expect(screen.getByText(/^fake store$/i)).toBeInTheDocument();
  });

  it("renders links", () => {
    render(
      <CartContext.Provider value={{ cart: cart }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartContext.Provider>
    );
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveAttribute("href", "/shop");
    expect(links[2]).toHaveAttribute("href", "/cart");
  });

  it("renders number of items in the cart", () => {
    render(
      <CartContext.Provider value={{ cart: cart }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartContext.Provider>
    );
    expect(screen.getByText(5)).toBeInTheDocument();
  });
});
