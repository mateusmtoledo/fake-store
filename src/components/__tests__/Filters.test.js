import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filters from '../Filters';
import products from '../../fakeData/products.json';
import userEvent from '@testing-library/user-event';

const props = {
  products,
  categoriesFilter: [],
  setCategoriesFilter: jest.fn(),
  setPriceRangeIndex: jest.fn(),
  setCurrentPage: jest.fn(),
};

describe('Filters', () => {
  it('renders list of categories', () => {
    render(<Filters {...props} />);
    expect(screen.getByText("men's clothing (4)")).toBeInTheDocument();
    expect(screen.getByText('jewelery (4)')).toBeInTheDocument();
    expect(screen.getByText('electronics (6)')).toBeInTheDocument();
    expect(screen.getByText("women's clothing (6)")).toBeInTheDocument();
  });

  it('renders price range filters', () => {
    render(<Filters {...props} />);
    expect(screen.getByText('Below $10')).toBeInTheDocument();
    expect(screen.getByText('$10 to $20')).toBeInTheDocument();
    expect(screen.getByText('$20 to $50')).toBeInTheDocument();
    expect(screen.getByText('$50 to $100')).toBeInTheDocument();
    expect(screen.getByText('$100 to $500')).toBeInTheDocument();
    expect(screen.getByText('Above $500')).toBeInTheDocument();
  });

  describe('when a category is clicked', () => {
    it('calls setCategoriesFilter with correct arguments', () => {
      render(<Filters {...props} />);
      userEvent.click(screen.getByText("men's clothing (4)"));
      expect(props.setCategoriesFilter).toBeCalledWith("men's clothing");
    });

    it('calls setCurrentPage with 1', () => {
      render(<Filters {...props} />);
      userEvent.click(screen.getByText("men's clothing (4)"));
      expect(props.setCurrentPage).toBeCalledWith(1);
    });

    describe('if category is already selected', () => {
      it('calls setCategoriesFilter with null', () => {
        render(<Filters {...props} categoriesFilter="men's clothing" />);
        userEvent.click(screen.getByText("men's clothing (4)"));
        expect(props.setCategoriesFilter).toBeCalledWith(null);
      });
    });
  });

  describe('when a price range is clicked', () => {
    it('calls setPriceRangeIndex with correct arguments', () => {
      render(<Filters {...props} />);
      userEvent.click(screen.getByText('$50 to $100'));
      expect(props.setPriceRangeIndex).toBeCalledWith(3);
    });

    it('calls setCurrentPage with 1', () => {
      render(<Filters {...props} />);
      userEvent.click(screen.getByText('$50 to $100'));
      expect(props.setCurrentPage).toBeCalledWith(1);
    });

    describe('if price range is already selected', () => {
      it('calls setPriceRangeIndex with null', () => {
        render(<Filters {...props} priceRangeIndex={3} />);
        userEvent.click(screen.getByText('$50 to $100'));
        expect(props.setPriceRangeIndex).toBeCalledWith(null);
      });
    });
  });
});
