import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../Modal";
import ReactDOM from "react-dom";
import { ReactPortal } from "react";

describe("Modal", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<div id="portal" />);
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element as ReactPortal;
    });
  });

  it("renders children", () => {
    render(
      <Modal>
        <div>this is a child div</div>
      </Modal>
    );
    expect(screen.getByText("this is a child div")).toBeInTheDocument();
  });

  it("sets body overflow property to hidden when mounted", () => {
    document.body.style.setProperty = jest.fn();
    render(
      <Modal>
        <div>this is a child div</div>
      </Modal>
    );
    expect(document.body.style.setProperty).toBeCalledWith(
      "overflow",
      "hidden"
    );
  });

  it("removes body overflow property when unmounted", () => {
    document.body.style.removeProperty = jest.fn();
    const { unmount } = render(
      <Modal>
        <div>this is a child div</div>
      </Modal>
    );
    unmount();
    expect(document.body.style.removeProperty).toBeCalledWith("overflow");
  });
});
