import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartItem from "../CartItem";
import userEvent from "@testing-library/user-event";
import products from "../../fakeData/products.json";
import { CartContext } from "../../contexts/CartContext";

const cartContextValue = {
  cart: [],
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  updateQuantity: jest.fn(),
};

const props = {
  item: {
    product: products[0],
    quantity: 3,
  },
};

const { item: fakeCartItem } = props;

describe("CartItem", () => {
  it("renders an image of the product", () => {
    render(<CartItem {...props} />);
    const image = screen.getByAltText(fakeCartItem.product.title);
    if (!(image instanceof HTMLImageElement))
      throw new Error("Element is not an image");
    expect(image.src).toBe(fakeCartItem.product.image);
  });

  it("renders the product title", () => {
    render(<CartItem {...props} />);
    const title = screen.getByText(fakeCartItem.product.title);
    expect(title).toBeInTheDocument();
  });

  it("renders the product price", () => {
    render(<CartItem {...props} />);
    const price = screen.getByText(/price per unit/i);
    expect(price).toHaveTextContent(fakeCartItem.product.price.toString());
  });

  it("renders the item quantity", () => {
    render(<CartItem {...props} />);
    const quantity = screen.getByLabelText(/quantity/i);
    if (!(quantity instanceof HTMLInputElement))
      throw new Error("Element is not an input");
    expect(quantity.value).toBe(fakeCartItem.quantity.toString());
  });

  it("renders total value", () => {
    render(<CartItem {...props} />);
    const totalPrice = screen.getByTitle(/total item cost/i);
    expect(totalPrice).toHaveTextContent(
      (fakeCartItem.product.price * fakeCartItem.quantity).toString()
    );
  });

  it("correctly updates the input", () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <CartItem {...props} />
      </CartContext.Provider>
    );
    const quantityInput = screen.getByRole("spinbutton");
    if (!(quantityInput instanceof HTMLInputElement))
      throw new Error("Element is not an input");
    userEvent.type(quantityInput, "3");
    expect(cartContextValue.updateQuantity).toBeCalledWith(products[0].id, 33);
  });
});

describe("remove button", () => {
  it("calls the removeFromCart function", () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <CartItem {...props} />
      </CartContext.Provider>
    );
    const removeButton = screen.getByText(/remove/i);
    userEvent.click(removeButton);
    expect(cartContextValue.removeFromCart).toHaveBeenCalled();
  });
});
