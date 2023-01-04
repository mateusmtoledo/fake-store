import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartPage from "../CartPage";
import { MemoryRouter } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import userEvent from "@testing-library/user-event";
import products from "../../fakeData/products.json";

const cart = new Array(5).fill(null).map((_, i) => ({
  product: {
    ...products[i],
    title: "This is a fake cart item",
    price: 53.23 - i,
  },
  quantity: 6 - i,
}));

const cartContextValue = {
  cart,
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  updateQuantity: jest.fn(),
};

describe("cart", () => {
  it("renders every cart item", () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </CartContext.Provider>
    );
    const renderedItems = screen.getAllByText("This is a fake cart item");
    expect(renderedItems.length).toBe(cart.length);
  });

  it("displays correct total order value", () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </CartContext.Provider>
    );
    const totalPriceElement = screen.getByText(/order total/i);
    expect(totalPriceElement).toBeInTheDocument();
    expect(screen.getByText(/1034.6/)).toBeInTheDocument();
  });

  it("renders checkout button", () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </CartContext.Provider>
    );
    const checkoutButton = screen.getByText(/checkout/i);
    expect(checkoutButton).toBeInTheDocument();
  });

  it("renders continue shopping button", () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </CartContext.Provider>
    );
    const continueShoppingButton = screen.getByText(/continue shopping/i);
    expect(continueShoppingButton).toBeInTheDocument();
  });

  it("renders message when cart is empty", () => {
    render(
      <CartContext.Provider value={{ ...cartContextValue, cart: [] }}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </CartContext.Provider>
    );
    const emptyCartMessage = screen.getByText(/your cart is empty/i);
    expect(emptyCartMessage).toBeInTheDocument();
  });
});

describe("quantity input", () => {
  describe("when user changes quantity", () => {
    it("calls updateQuantity with correct arguments", async () => {
      render(
        <CartContext.Provider
          value={{
            ...cartContextValue,
            cart: [cart[0]],
          }}
        >
          <MemoryRouter>
            <CartPage />
          </MemoryRouter>
        </CartContext.Provider>
      );
      const quantityInput = screen.getByLabelText(/quantity/i);
      if (!(quantityInput instanceof HTMLInputElement))
        throw new Error("Element is not an input");
      expect(quantityInput.value).toBe("6");
      userEvent.clear(quantityInput);
      userEvent.type(quantityInput, "3");
      expect(cartContextValue.updateQuantity).toBeCalledWith(
        cart[0].product.id,
        3
      );
    });
  });
});
