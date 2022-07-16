import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ItemList from '../ItemList';

jest.mock('../Card', () => ({ item }) => (
  <div data-testid={item.id}>
    {'This is a card mock'}
  </div>
));

const fakeItemArray = [];
for(let i = 0; i < 20; i++) {
  fakeItemArray.push({
    id: i,
  });
}

describe('ItemList', () => {
  it('renders 9 items at a time', () => {
    render(<ItemList itemArray={fakeItemArray} />);
    const displayedItems = screen.getAllByText('This is a card mock');
    expect(displayedItems.length).toBe(9);
  });

  it('initially renders first page', () => {
    render(<ItemList itemArray={fakeItemArray} />);
    for(let i = 0; i < 9; i += 1) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
  });

  it('renders next page button', () => {
    render(<ItemList itemArray={fakeItemArray} />);
    const nextPageButton = screen.getByText('>');
    expect(nextPageButton).toBeInTheDocument();
  });

  it('renders previous page button', () => {
    render(<ItemList itemArray={fakeItemArray} />);
    const previousPageButton = screen.getByText('<');
    expect(previousPageButton).toBeInTheDocument();
  });
});

describe('page number display', () => {
  it('correctly displays page numbers', () => {
    render(<ItemList itemArray={fakeItemArray} />);
    const pageNumberDisplay = screen.getByText(/page/i);
    const nextPageButton = screen.getByText('>');
    expect(pageNumberDisplay).toHaveTextContent('Page 1 of 3');
    userEvent.click(nextPageButton);
    expect(pageNumberDisplay).toHaveTextContent('Page 2 of 3');
  });
});

describe('next page button', () => {
  it('renders next page when clicked', () => {
    render(<ItemList itemArray={fakeItemArray} />);
    const nextPageButton = screen.getByText('>');
    for(let i = 0; i < 9; i += 1) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
    userEvent.click(nextPageButton);
    for(let i = 9; i < 18; i += 1) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
  });

  it('does not go further than last page', () => {
    render(<ItemList itemArray={fakeItemArray} />);
    const nextPageButton = screen.getByText('>');
    userEvent.click(nextPageButton);
    userEvent.click(nextPageButton);
    userEvent.click(nextPageButton);
    userEvent.click(nextPageButton);
    for(let i = 18; i < 20; i += 1) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
    expect(screen.getByText(/page/i)).toHaveTextContent('Page 3 of 3');
  });
});

describe('previous page button', () => {
  it('renders previous page when clicked', () => {
    render(<ItemList itemArray={fakeItemArray} />);
    const previousPageButton = screen.getByText('<');
    const nextPageButton = screen.getByText('>');
    userEvent.click(nextPageButton);
    for(let i = 9; i < 18; i += 1) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
    userEvent.click(previousPageButton);
    for(let i = 0; i < 9; i += 1) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
  });

  it('does not go further than first page', () => {
    render(<ItemList itemArray={fakeItemArray} />);
    const previousPageButton = screen.getByText('<');
    userEvent.click(previousPageButton);
    userEvent.click(previousPageButton);
    for(let i = 0; i < 9; i += 1) {
      expect(screen.getByTestId(i)).toBeInTheDocument();
    }
    expect(screen.getByText(/page/i)).toHaveTextContent('Page 1 of 3');
  });
});
