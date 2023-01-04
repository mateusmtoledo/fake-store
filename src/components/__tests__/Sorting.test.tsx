import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sorting from "../Sorting";
import userEvent from "@testing-library/user-event";

const props = {
  sortBy: "somestring",
  setSortBy: jest.fn(),
};

describe("Sorting", () => {
  it("renders options", () => {
    render(<Sorting {...props} />);
    expect(screen.getByText(/best rated/i)).toHaveValue("rating-");
    expect(screen.getByText(/latest/i)).toHaveValue("date-");
    expect(screen.getByText("Price (⇑)")).toHaveValue("price+");
    expect(screen.getByText("Price (⇓)")).toHaveValue("price-");
  });

  describe("on change", () => {
    it("calls setSortBy with correct arguments", () => {
      render(<Sorting {...props} />);
      userEvent.selectOptions(screen.getByRole("combobox"), ["date-"]);
      expect(props.setSortBy).toBeCalledWith("date-");
    });
  });
});
