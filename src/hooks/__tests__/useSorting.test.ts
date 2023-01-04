import { renderHook } from "@testing-library/react";
import useSorting from "../useSorting";
import products from "../../fakeData/products.json";
import { getSortedProducts } from "../../utils/sortUtils";

jest.mock("../../utils/sortUtils", () => ({
  getSortedProducts: jest.fn(),
}));

describe("useSorting", () => {
  it.only("calls getSortedProducts with correct arguments", () => {
    renderHook(() => useSorting(products, "price+"));
    expect(getSortedProducts).toBeCalledWith(products, "price+");
  });
});
