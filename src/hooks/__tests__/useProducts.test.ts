import { renderHook, waitFor } from "@testing-library/react";
import useProducts from "../useProducts";
import products from "../../fakeData/products.json";

beforeEach(() => {
  window.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(products),
  });
});

describe("useProducts", () => {
  it("calls fetch with correct arguments", async () => {
    const { result } = renderHook(useProducts);
    await waitFor(() => expect(result.current.products).toBe(products));
    expect(fetch).toBeCalledWith("https://fakestoreapi.com/products");
  });

  it("sets product list according to api response", async () => {
    const { result } = renderHook(useProducts);
    await waitFor(() => expect(result.current.products).toBe(products));
  });
});
