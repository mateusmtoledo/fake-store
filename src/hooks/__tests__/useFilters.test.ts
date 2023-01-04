import { renderHook } from "@testing-library/react";
import useFilters from "../useFilters";
import products from "../../fakeData/products.json";
import { act } from "react-dom/test-utils";

describe("useFilters", () => {
  it("initially returns original product array", () => {
    const { result } = renderHook(() => useFilters(products, null));
    expect(result.current.filteredProducts).toMatchObject(products);
  });

  describe("addCategoryFilter", () => {
    it("adds category to categoryFilters", () => {
      const { result } = renderHook(() => useFilters(products, null));
      act(() => result.current.addCategoryFilter("men's clothing"));
      expect(result.current.categoriesFilters.has("men's clothing")).toBe(true);
    });
  });

  describe("deleteCategoryFilter", () => {
    it("deletes category from categoryFilters", () => {
      const { result } = renderHook(() => useFilters(products, null));
      act(() => result.current.addCategoryFilter("men's clothing"));
      expect(result.current.categoriesFilters.has("men's clothing")).toBe(true);
      act(() => result.current.deleteCategoryFilter("men's clothing"));
      expect(result.current.categoriesFilters.has("men's clothing")).toBe(
        false
      );
    });
  });

  it("filters by price range", () => {
    const { result } = renderHook(() => useFilters(products, 3));
    expect(result.current.filteredProducts.length).toBe(3);
  });
});
